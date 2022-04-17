import { useEffect, useState } from "react";
import Web3 from "web3";
import styles from "./Main.module.scss";
import Home from "../home";
import Gallery from "../gallery";
import Roadmap from "../roadmap";
import Faq from "../faq";
import Footer from "../footer";
import nftcalendar from "../../assets/NFTCalendar.png";
import Ourstory from "../ourstory";
// import OnBoard from "bnc-onboard";

import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import gnosisModule from '@web3-onboard/gnosis';
import mewModule from '@web3-onboard/mew';
import fortmaticModule from "@web3-onboard/fortmatic";
import portisModule from '@web3-onboard/portis';
import torusModule from '@web3-onboard/torus';
import walletConnectModule from '@web3-onboard/walletconnect';
import walletLinkModule from '@web3-onboard/walletlink';
import ledgerModule from '@web3-onboard/ledger';
import trezorModule from '@web3-onboard/trezor';
import keystoneModule from '@web3-onboard/keystone';


const RPC_URL = "https://mainnet.infura.io/v3/6d881ca2000f40f1a5dd339a552bfcdd";
const fortmatic = fortmaticModule({ apiKey: 'pk_live_8FC272D2B76AB985' });
const injected = injectedModule();
const gnosis = gnosisModule();
const mew = mewModule();
const portis = portisModule({ apiKey: '919c5693-d3a3-44ed-a070-4ecb56c92ca4' }); // not sure, this is a project id atm 
const torus = torusModule();
const walletConnect = walletConnectModule({
  bridge: 'https://bridge.walletconnect.org',
  qrcodeModalOptions: {
    mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
  }
});
const walletLink = walletLinkModule({ darkMode: true });
const ledger = ledgerModule();
const trezor = trezorModule({
  email: 'manishgt194@gmail.com',
  appUrl: 'https://researchfundingclub.com/'
});
const keystone = keystoneModule();

const onboard = Onboard({
  wallets: [
    injected,
    fortmatic,
    gnosis,
    mew,
    portis,
    torus,
    walletConnect,
    walletLink,
    ledger,
    trezor,
    keystone
  ],
  
  chains: [
    {
      id: '0x1',  // chain ID must be in hexadecimel
      token: 'ETH',  // main chain token
      label: 'Ethereum Mainnet',
      rpcUrl: RPC_URL  // rpcURL required for wallet balances
    },
    {
      id: '0x3',
      token: 'tROP',
      label: 'Ethereum Ropsten Testnet',
      rpcUrl: RPC_URL
    },
    {
      id: '0x4',
      token: 'rETH',
      label: 'Ethereum Rinkeby Testnet',
      rpcUrl: RPC_URL
    },
    {
      id: '0x38',
      token: 'BNB',
      label: 'Binance Smart Chain',
      rpcUrl: 'https://bsc-dataseed.binance.org/'
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Matic Mainnet',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    },
    {
      id: '0xfa',
      token: 'FTM',
      label: 'Fantom Mainnet',
      rpcUrl: 'https://rpc.ftm.tools/'
    }
  ],
  appMetadata: {
    name: 'My App',
    icon: '<SVG_ICON_STRING>',
    logo: '<SVG_LOGO_STRING>',
    description: 'My app using Onboard',
    recommendedInjectedWallets: [ 
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' }
    ]
  }
})

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
  const [feedback, setFeedback] = useState(`Connect`);

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

  const loadContract = async (addr, config) => {
    const { ethereum } = window;
    let web3 = new Web3(ethereum);

    var networkId = await web3.eth.net.getId();

    if (networkId !== config["NETWORK"]["ID"]) {
      setFeedback("Change to " + config["NETWORK"]["NAME"]);
      return;
    }

    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();

    var obj = new web3.eth.Contract(abi, addr);

    var maxSupply = await obj.methods.MAX_SUPPLY().call();
    var minSupply = await obj.methods.MIN_SUPPLY().call();
    var totalSupply = maxSupply - minSupply;
    var mintedAmount = await obj.methods.totalSupply().call();

    setMintedAmount(mintedAmount);
    setTotalSupply(totalSupply);
    setSmartContract(obj);
    // console.log("here", maxSupply, minSupply, mintedAmount);
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
    loadContract(config.CONTRACT_ADDRESS, config);
  };

  const mint = () => {
    console.log("i am here");
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
        setFeedback("Mint Failed");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(`Successfully Minted`);
        setClaimingNft(false);
        getConfig();
      });
  };

  useEffect(() => {
    getConfig();
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      setFeedback("Mint");
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    await onboard.connectWallet()
  }

  const connectWallet2 = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      setFeedback("Mint");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Home id={homeRef} linkId={homeId} />
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
              <button onClick={connectWallet}>Connect Wallet</button>
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
      <Footer />
    </div>
  );
}
