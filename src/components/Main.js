import { makeStyles } from "@mui/styles";
import { Box, Button, Container, Typography } from "@mui/material";
import NFTCards from "./NFTCards";
import { useEffect, useState } from "react";
import NFTCalendarLogo from "../images/nftcalendar-500x500.png";
import Web3 from "web3";

const useStyles = makeStyles((theme) => ({
  introContent: {
    minHeight: "50vh",
    marginTop: "10%",
    textAlign: "center",
    justifyContent: "center",
    padding: theme.spacing(2, 0),

    "& p": {
      fontSize: "1rem",
      fontWeight: "900",
    },
    "& button": {
      maxWidth: "350px",
    },
  },
  logo: {
    height: 600,
    width: 600,
    [theme.breakpoints.down("md")]: {
      height: 400,
      width: 400,
    },
  },
  green: {
    color: "#175c4c",
  },
  bgBeige: {
    backgroundColor: "rgba(239,219,206,0.2)",
  },
  card: {
    width: "90%",
    margin: "20px auto",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  },
}));



// Main
const Main = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  const [claimingNft, setClaimingNft] = useState(false);
  const [mintedAmount, setMintedAmount] = useState(0);
  const [feedback, setFeedback] = useState(
    `Connect your wallet.`
  );
  
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

    var obj = new web3.eth.Contract(
      abi,
      addr
    );

    var maxSupply = await obj.methods.MAX_SUPPLY().call();
    var minSupply = await obj.methods.MIN_SUPPLY().call();
    var totalSupply = maxSupply - minSupply;
    var mintedAmount = await obj.methods.totalSupply().call();
    
    setMintedAmount(mintedAmount);
    setTotalSupply(totalSupply);
    setSmartContract(obj);
    console.log('here');
  }

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
  }

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
  }

  useEffect(() => {
    getConfig();
    checkIfWalletIsConnected();
  }, []);

  const classes = useStyles();

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
    <Container className="App">
      <Box className={classes.introContent}>
        <Typography variant="h2" style={{ margin: "20px 0" }}>
          Research Funding Club
        </Typography>
        <Typography
          variant="h5"
          style={{ margin: "20px auto", maxWidth: "80%" }}
        >
          The NFT project dedicated to becoming the largest donor to global
          research institutions studying the world's deadliest diseases.
        </Typography>
        <div style={{ margin: "20px 0" }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() =>
              (window.location.href = "https://discord.gg/b6qdYN8zzr")
            }
          >
            Join Discord
          </Button>
        </div>
        <Box style={{ width: "90%", margin: "20px auto", textAlign: "center" }}>
          <Typography variant="h6" className={classes.green}>
            As Seen On
          </Typography>

          <a
            href="https://nftcalendar.io/event/research-funding-club-drop-1/"
            target="_blank"
            rel="noreferrer"
          >
            <img height={150} width="auto" src={NFTCalendarLogo} />
          </a>
        </Box>
      </Box>

      <Box style={{ width: "90%", margin: "20px auto" }}>
        <Typography
          className={classes.green}
          variant="h4"
          style={{ textAlign: "center", margin: "10px 0" }}
        >
          {feedback}
        </Typography>
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          {currentAccount === "" || smartContract === "" ? (
            <Button
              onClick={connectWallet}
              className=""
              color="primary"
              variant="outlined"
            >
              Connect to Wallet
            </Button>
          ) : (
            <>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  mint();
                }}
                className=""
                color="primary"
                variant="outlined"
              >
                Mint
              </Button>              
              <div style={{ textAlign: "center", margin: "10px 0" }}>
              <span>
                Only {totalSupply - mintedAmount} Left
              </span>
              <span> Max {totalSupply}</span>
              </div>            
            </>
          )}
        </div>

      </Box>

      <NFTCards />

      <Box className={classes.card}>
        <Typography variant="h4" gutterBottom className={classes.green}>
          Our Story
        </Typography>
        <Typography variant="h6">
          I started working on Research Funding Club as a way to explore the
          Web3 ecosystem (I'm a software engineer and have founded and scaled
          Web2 tech companies - and have been following Web3 for a couple years
          now).
        </Typography>
        <Typography variant="h6">
          I lost both of my parents over the span of 2 years, one to cancer and
          one to a cardiac event. After finding boxes of old photos in our
          parents house, I thought about getting some of them made into nice
          pieces of art and minting them as NFTs. Originally I just wanted to
          preserve some memories, and learn about Web3. After seeing some of the
          other charity projects in the Web3 space, I thought it would be
          awesome to work on an NFT project for a good cause.
        </Typography>
      </Box>

      <Box className={classes.card}>
        <Typography variant="h4" gutterBottom className={classes.green}>
          What Are Our NFT's?
        </Typography>
        <Typography variant="h6">
          Research Funding Club are NFTs following the{" "}
          <a
            href="https://eips.ethereum.org/EIPS/eip-721"
            target="_blank"
            rel="noreferrer"
          >
            ERC-721
          </a>{" "}
          standard. The first drop is a collection of 25 NFT's that are
          portrait's of different photos we found of our family. There's 5
          different portrait's in the first drop - all done by a different
          artist. Each portrait has 5 different versions, with different
          backgrounds and different visual effects. There's one{" "}
          <a
            href="https://www.larvalabs.com/cryptopunks"
            target="_blank"
            rel="noreferrer"
          >
            punk{" "}
          </a>
          inspired version of each portrait.
        </Typography>
      </Box>

      <Box className={classes.card}>
        <Typography variant="h4" gutterBottom className={classes.green}>
          Why Buy One of Our NFT's?
        </Typography>
        <Typography variant="h6" style={{ margin: "5px 0" }}>
          <ol>
            <li>
              On our first drop, we'll donate 5% of all proceeds to the American
              Heart Association, and another 5% to American Cancer Society. For
              every transaction that occurs after the first drop, 5% of the
              royalties will be set aside for donation. We'll let our owners
              decide the institution.
            </li>
            <li>
              We'll eventually have a token that our owners will be able to
              accumulate for everyday that they own one of our NFT's. That token
              will be able to be exchanged for ETH.
            </li>
            <li>
              Collect all 5 versions of the same portrait, and we'll mint the
              original photograph as an NFT and transfer it to you.
            </li>
          </ol>
        </Typography>
      </Box>

      <Box className={classes.card}>
        <Typography variant="h4" gutterBottom className={classes.green}>
          Where Will the Proceeds Go?
        </Typography>
        <Typography variant="h6">
          10% of the first drop proceeds will go to American Heart Assocation
          and American Cancer Society. 5% of all royalties from transactions
          after the first drop will be set aside for charity and our NFT holders
          will help us decide where to donate.
        </Typography>
        <Typography variant="h6">
          The rest of the proceeds, and any royalties on transactions in the
          future will go towards the following:
          <ul>
            <li>
              Hiring quality digital artists to create the next drop of NFTs
            </li>
            <li>
              Hiring developers to help build the RFC token that will be used to
              award hodlers of our NFT's
            </li>
            <li>
              Hiring marketers to help fulfill the goal of becoming the largest
              donor to research institutions studying the world's deadliest
              diseases
            </li>
          </ul>
        </Typography>
      </Box>
    </Container>
  );
};

export default Main;
