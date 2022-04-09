import { useEffect, useState } from "react";
import Web3 from "web3";
import styles from "./Main.module.scss";
import Home from "../home";
import Gallery from "../gallery";
import Roadmap from "../roadmap";
import Faq from "../faq";
import Footer from "../footer";
import nftcalendar from "../../assets/NFTCalendar.png";

export default function Main({
  homeRef,
  galleryRef,
  roadmapRef,
  faqRef,
  roadmapId,
  faqId,
  homeId,
  galleryId,
}) {
  const [currentAccount, setCurrentAccount] = useState("");

  const [claimingNft, setClaimingNft] = useState(false);
  const [mintedAmount, setMintedAmount] = useState(0);
  const [feedback, setFeedback] = useState(`Connect your wallet.`);

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

  const loadContract = async (addr) => {
    const { ethereum } = window;
    let web3 = new Web3(ethereum);

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
    console.log("here");
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
    loadContract(config.CONTRACT_ADDRESS);
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
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(`successful`);
        setClaimingNft(false);
        loadContract(CONFIG.CONTRACT_ADDRESS);
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
      setFeedback("Click to mint.");
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
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
      setFeedback("Click to mint.");
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
              0 of <span>25</span>
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
                Mint NFT
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
      <Gallery id={galleryRef} linkId={galleryId} />
      <Roadmap id={roadmapRef} linkId={roadmapId} />
      <Faq id={faqRef} linkId={faqId} />
      <Footer />
    </div>
  );
}
