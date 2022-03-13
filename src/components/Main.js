import logo from "../logo1.png";
import { makeStyles } from "@mui/styles";
import { Box, Button, Container, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gridTemplateRows: "1fr auto",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "100%",
    },
  },
  introContent: {
    maxWidth: "80%",
    minHeight: "44vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(2, 0),
    "& > * + *": {
      marginTop: theme.spacing(2),
    },

    "& p": {
      fontSize: "1rem",
      fontWeight: "900",
    },
    "& button": {
      maxWidth: "350px",
    },

    [theme.breakpoints.down("sm")]: {
      gridRow: "2 / 3",
      textAlign: "center",
      display: "block",
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

const Main = () => {
  const classes = useStyles();

  return (
    <Container className="App">
      <div className={classes.root}>
        <div className={classes.introContent}>
          <Typography variant="h5">
            The NFT project dedicated to becoming the largest donor to global
            research institutions studying the world's deadliest diseases.
          </Typography>
          <div>
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
        </div>
        <div>
          <img className={classes.logo} src={logo} alt="logo" />
        </div>
      </div>

      <Box className={classes.card}>
        <Typography variant="h4" gutterBottom className={classes.green}>
          Our Story
        </Typography>
        <Typography variant="h6">
          I'm Sean. In 2019, I lost my mother to a long battle with cancer. 2
          years later, I lost my father to a cardiac event. When my brothers and
          I found boxes of old family photos, I thought it'd be cool to get some
          of them made into digital art and mint them as NFT's. A software
          engineer by trade (I've founded and scaled Web2 companies), I've
          always wanted to get into the Web3 ecosystem. This was a perfect
          chance. As an outlet for me to grieve and commemorate my parents, as
          well as raise money to study the diseases that took my parents, I
          began working on Research Funding Club.
        </Typography>
      </Box>

      <Box className={classes.card}>
        <Typography variant="h4" gutterBottom className={classes.green}>
          What Are Our NFT's?
        </Typography>
        <Typography variant="h6">
          The first drop is a collection of 25 NFT's that are portrait's of my
          mother and my father. There's 5 different portrait's all done by a
          different artist. Each portrait has 5 different versions, with
          different backgrounds and different visual effects. There's one "punk"
          inspired version of each portrait.
        </Typography>
      </Box>

      <Box className={classes.card}>
        <Typography variant="h4" gutterBottom className={classes.green}>
          Why Buy One of Our NFT's?
        </Typography>
        <Typography variant="h6">
          On our first drop, we'll donate 5% of all proceeds to the American
          Heart Association, and another 5% to American Cancer Society. For
          every transaction that occurs after the first drop, 5% of the
          royalties will be set aside for donation. We'll let our owners decide
          the institution.
        </Typography>
        <Typography variant="h6">
          In the roadmap, we're also looking at building a token that our owners
          will be able to accumulate for everyday that they own one of our
          NFT's. That token will be able to be exchanged for ETH.
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
