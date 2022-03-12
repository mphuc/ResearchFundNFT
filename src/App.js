import logo from "./logo-black.png";
import "./App.css";
import { Box, Container, Typography } from "@mui/material";

function App() {
  return (
    <Container className="App">
      <Box sx={{ display: "flex" }} className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h4">
          Dedicated to becoming the largest donor to global research
          institutions studying the world's deadliest diseases.
        </Typography>
      </Box>

      <Box>
        <h2 className="font-blue">What is Research Funding Club?</h2>
        <p>
          Research Funding Club is an NFT project dedicated to becoming the
          largest donor to global research institutions that are studying the
          world's deadliest diseases. The first collection will launch Summer
          2022 and consist of 25 unique NFT's.
        </p>
      </Box>

      <Box>
        <h2 className="font-blue">Who Are We?</h2>
        <p>
          I'm an engineer, who's founded a Web2 company and been involved in
          scaling Web2 companies my whole career. I've been critical to
          multimillion dollar fundraising rounds for multiple Web2 companies. I
          became passionate about Web3 once I started studying what exactly it
          is and how different it is from Web2. In 2019, I lost my mother to a
          long battle with cancer. 2 years later, I lost my father to a cardiac
          event. After I lost my father, my brothers and I were cleaning some
          things out from our parent's home and we found so many old
          photographs. Boxes and boxes of old photographs. I thought it would be
          great to get some of them made into digital art, and minted as NFTs.
          Starting as an outlet for me to grieve and commemorate my parents,
          turned into the birth of Research Funding Club.
        </p>
      </Box>

      <Box>
        <h2 className="font-blue">What Are Our NFT's?</h2>
        <p>
          The first drop is a collection of 25 NFT's that are portrait's of my
          mother and my father. There's 5 different portrait's all done by a
          different artist. Each portrait has 5 different versions, with
          different backgrounds and different visual effects. There's one "punk"
          inspired version of each portrait.
        </p>
      </Box>

      <Box>
        <h2 className="font-blue">Why Buy One of Our NFT's?</h2>
        <p>
          On our first drop, we'll donate 5% of all proceeds to the American
          Heart Association, and another 5% to American Cancer Society. For
          every transaction that occurs after the first drop, 5% of the
          royalties will be set aside for donation. We'll let our owners decide
          the institution.
        </p>
        <p>
          In the first drop of 25, there's 5 "punk" inspired versions. If you
          can collect all 5 "punk" inspired versions, we'll award you with a
          unique colorized NFT portrait.
        </p>
        <p>
          In the roadmap, we're also looking at building a token that our owners
          will be able to accumulate for everyday that they own one of our
          NFT's. That token will be able to be exchanged for ETH.
        </p>
      </Box>

      <Box>
        <h2 className="font-blue">Where Will the Proceeds Go?</h2>
        <p>
          10% of the first drop proceeds will go to American Heart Assocation
          and American Cancer Society. 5% of all royalties from transactions
          after the first drop will be set aside for charity and our NFT holders
          will help us decide where to donate.
        </p>
        <p>
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
        </p>
      </Box>
    </Container>
  );
}

export default App;
