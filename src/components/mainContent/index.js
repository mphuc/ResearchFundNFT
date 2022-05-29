import { useEffect, useState } from "react";
import Web3 from "web3";
import styles from "./Main.module.scss";
import Home from "../home";
import Gallery from "../gallery";
import Roadmap from "../roadmap";
import Faq from "../faq";
import nftcalendar from "../../assets/NFTCalendar.png";
import Ourstory from "../ourstory";
import Onboard from "bnc-onboard";
import app from "./fire.js";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

var db = app.firestore();
let web3;

const BLOCKNATIVE_KEY = "aa821374-77e8-4a14-8e84-41c98acefc7d";

// the network id that your dapp runs on
// important for deployment

// const NETWORK_ID = 5777;
const NETWORK_ID = 1; // change

const FORTMATIC_KEY = "pk_live_8FC272D2B76AB985";
const PORTIS_KEY = "919c5693-d3a3-44ed-a070-4ecb56c92ca4"; // not sure, this is a project id atm
const INFURA_KEY = "e914976b74504e65bf8cb2864584556b";
const APP_URL = "https://researchfundingclub.com";
const CONTACT_EMAIL = "manishgt194@gmail.com";
const RPC_URL = "https://mainnet.infura.io/v3/7894d0f19d6b45e5a31e0fbe067a3c09";
const APP_NAME = "Research Funding Club";

const wallets = [
  { walletName: "coinbase", preferred: true },
  { walletName: "trust", preferred: true, rpcUrl: RPC_URL },
  { walletName: "metamask", preferred: true },
  { walletName: "authereum" },
  {
    walletName: "trezor",
    appUrl: APP_URL,
    email: CONTACT_EMAIL,
    rpcUrl: RPC_URL,
  },
  {
    walletName: "ledger",
    rpcUrl: RPC_URL,
  },
  {
    walletName: "lattice",
    rpcUrl: RPC_URL,
    appName: APP_NAME,
  },
  {
    walletName: "keepkey",
    rpcUrl: RPC_URL,
  },
  {
    walletName: "cobovault",
    rpcUrl: RPC_URL,
    appName: APP_NAME,
  },
  {
    walletName: "keystone",
    rpcUrl: RPC_URL,
    appName: APP_NAME,
  },
  {
    walletName: "fortmatic",
    apiKey: FORTMATIC_KEY,
    preferred: true,
  },
  {
    walletName: "walletConnect",
    infuraKey: INFURA_KEY,
  },
  { walletName: "opera" },
  { walletName: "operaTouch" },
  { walletName: "torus" },
  { walletName: "status" },
  { walletName: "walletLink", rpcUrl: RPC_URL, appName: APP_NAME },
  { walletName: "imToken", rpcUrl: RPC_URL },
  { walletName: "meetone" },
  { walletName: "mykey", rpcUrl: RPC_URL },
  { walletName: "huobiwallet", rpcUrl: RPC_URL },
  { walletName: "hyperpay" },
  { walletName: "wallet.io", rpcUrl: RPC_URL },
  { walletName: "atoken" },
  { walletName: "frame" },
  { walletName: "ownbit" },
  { walletName: "alphawallet" },
  { walletName: "gnosis" },
  { walletName: "xdefi" },
  { walletName: "bitpie" },
  { walletName: "binance" },
  { walletName: "liquality" },
];

const onboard = Onboard({
  dappId: BLOCKNATIVE_KEY,
  networkId: NETWORK_ID,
  darkMode: true,
  walletSelect: {
    wallets: wallets,
  },
  subscriptions: {
    wallet: (wallet) => {
      // instantiate web3 when the user has selected a wallet
      web3 = new Web3(wallet.provider);
      console.log(`${wallet.name} connected!`);
    },
  },
});

export default function Main({
  homeRef,
  galleryRef,
  roadmapRef,
  faqRef,
  roadmapId,
  faqId,
  homeId,
  galleryId,
  ourstoryRef,
  ourstoryId,
}) {
  const [currentAccount, setCurrentAccount] = useState("");
  const [claimingNft, setClaimingNft] = useState(false);
  const [mintedAmount, setMintedAmount] = useState(0);
  const [feedback, setFeedback] = useState(`Connect Wallet`);
  const [currentRaised, setCurrentRaised] = useState();

  const [smartContract, setSmartContract] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 4,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const loadContract = async () => {
    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();

    var obj = new web3.eth.Contract(abi, CONFIG.CONTRACT_ADDRESS);
    setSmartContract(obj);

    // get mint pause state:
    var state = await obj.methods.paused().call();
    console.log("State: ", state);
    if (state == true) {
      setFeedback("Mint Paused: Tx will fail");
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();

    SET_CONFIG(config);
    loadSupplyData2();
    loadContract(config.CONTRACT_ADDRESS, config);
  };

  const getCurrentRaised = async () => {
    const ethPriceResponse = await fetch(
      "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=ABA4YGGDRPS9YMM4ZY93EMV92JHBAPST1K"
    );

    const ethPrice = await ethPriceResponse.json();

    const ethUsd = ethPrice.result.ethusd;

    const contractValResponse = await fetch(
      "https://api.etherscan.io/api?module=account&action=balance&address=0x39cEd238262Eb15B1409871bbcb5B89a478f68C4&tag=latest&apikey=ABA4YGGDRPS9YMM4ZY93EMV92JHBAPST1K"
    );

    const contractVal = await contractValResponse.json();

    const contractValEth = parseInt(contractVal.result.slice(0, 5)) * 0.0001;

    setCurrentRaised((ethUsd * contractValEth).toFixed(2));
  };

  const loadSupplyData2 = async () => {
    db.collection("mintedNFTS")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((res) => {
          var data = res.data();

          var mintedValue = data["count"];
          var total = data["total"];

          setMintedAmount(mintedValue);
          setTotalSupply(total);
        });
      });
  };

  const mint = () => {
    var mintAmount = 1;
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Pending`);
    setClaimingNft(true);

    smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: currentAccount,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Mint Failed: Refresh");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(`Successfully Minted`);
        setClaimingNft(false);

        // update on database
        db.collection("mintedNFTS")
          .doc("z8cdvS7m0e0n3DTMpkHU")
          .set({
            count: parseInt(parseInt(mintedAmount) + 1),
            total: parseInt(totalSupply),
          });
        loadSupplyData2();
        getConfig();
      });
  };

  useEffect(() => {
    getConfig();
    getCurrentRaised();
  }, []);

  const connectWallet = async () => {
    await onboard.walletSelect();
    await onboard.walletCheck();

    // set the account
    const accounts = await web3.eth.getAccounts();
    loadContract();
    setCurrentAccount(accounts[0]);
    setFeedback("Mint");
  };

  return (
    <div className={styles.container}>
      <Home id={homeRef} linkId={homeId} currentRaised={currentRaised} />
      <div className={styles.featured}>
        <div>
          <p>Featured in</p>
          <img src={nftcalendar} alt="" />
        </div>
        <div className={styles.wrapper}>
          <div>
            <h2>
              NFTS
              <br />
              MINTED
            </h2>
            <p>
              {mintedAmount} of <span> {totalSupply} </span>
            </p>
            {currentAccount === "" || smartContract === "" ? (
              <button onClick={connectWallet}>{feedback}</button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  mint();
                }}
              >
                {feedback}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.donations}>
        <h1>Donations</h1>
        <div>
          <div>
            <p>
              <span>-</span>
              <br />
              American Heart Association
            </p>
          </div>
          <div>
            <p>
              <span>-</span>
              <br />
              Total Donations
            </p>
          </div>
          <div>
            <p>
              <span>-</span>
              <br />
              American Cancer Society
            </p>
          </div>
        </div>
      </div>
      <Ourstory id={ourstoryRef} linkId={ourstoryId} />
      <Gallery id={galleryRef} linkId={galleryId} />
      <Roadmap id={roadmapRef} linkId={roadmapId} />
      <Faq id={faqRef} linkId={faqId} />
    </div>
  );
}
