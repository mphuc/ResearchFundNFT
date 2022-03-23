import { Card, CardContent } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import MomDadBlue from "../nfts/MomDadBlue.png";
import MomDadPunks from "../nfts/MomDadPunksPixel2.png";
import MomDadRedWhite from "../nfts/MomDadRedWhite.png";
import MomDadYellow from "../nfts/MomDadYellow.png";
import MomDadColor from "../nfts/MomDadColor.png";
import DadA2 from "../nfts/Dad1A2Maize.png";
import DadBroncoBlue from "../nfts/Dad1BroncoBlue.png";
import DadBroncoOrange from "../nfts/Dad1BroncoOrange.png";
import DadMIOH from "../nfts/Dad1MOHRed.png";
import DadPunk from "../nfts/DadPixel.png";
import MomOrange from "../nfts/Mom1Orange.png";
import MomPink from "../nfts/Mom1Pink.png";
import MomPunk from "../nfts/Mom1Punk.png";
import MomPurple from "../nfts/Mom1Purple.png";
import MomYellow from "../nfts/Mom1Yellow.png";

function NFTCards() {
  const images = [
    {
      image: MomDadBlue,
      name: "Mom Dad Blue #1",
    },
    {
      image: DadA2,
      name: "Dad A2 Maize #1",
    },
    {
      image: MomYellow,
      name: "Mom Yellow #1",
    },
    {
      image: MomDadPunks,
      name: "Mom Dad Punk #1",
    },
    {
      image: MomPink,
      name: "Mom Pink #1",
    },
    {
      image: MomPurple,
      name: "Mom Purple #1",
    },
    {
      image: MomDadRedWhite,
      name: "Mom Dad Red White #1",
    },
    {
      image: MomDadColor,
      name: "Mom Dad Colorized #1",
    },
    {
      image: DadBroncoBlue,
      name: "Dad Bronco Blue #1",
    },
    {
      image: DadBroncoOrange,
      name: "Dad Bronco Orange #1",
    },
    {
      image: MomDadYellow,
      name: "Mom Dad Yellow #1",
    },
    {
      image: DadMIOH,
      name: "Dad Miami OH Red #1",
    },
    {
      image: DadPunk,
      name: "Dad Punk #1",
    },
    {
      image: MomPunk,
      name: "Mom Punk #1",
    },
    {
      image: MomOrange,
      name: "Mom Orange #1",
    },
  ];

  return (
    <div style={{ height: "600px" }}>
      <Carousel animation="slide" swipe autoPlay interval={5000}>
        {images.map((image, i) => (
          <div key={i}>
            <Card style={{ width: "90%", margin: "5px auto" }}>
              <CardContent style={{ margin: "10px auto" }}>
                <div
                  style={{
                    textAlign: "center",
                    maxWidth: "330px",
                    overflow: "hidden",
                    margin: "10px auto",
                  }}
                >
                  <img src={image.image} height={330} width="auto" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default NFTCards;
