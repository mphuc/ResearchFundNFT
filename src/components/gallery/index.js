import styles from "./Gallery.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./card";
import { momDad, momDad2, dad, mom, dad2 } from "./nfts";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1100 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1100, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

export default function Gallery({ id, linkId }) {
  return (
    <div ref={linkId} className={styles.container}>
      <h1>Gallery</h1>
      <Carousel
        className={styles.carousel}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
      >
        {momDad.map((item, index) => (
          <Card key={index} img={item.image} name={item.name} />
        ))}
      </Carousel>
      <div ref={id}></div>
      <Carousel
        className={styles.carousel}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
      >
        {momDad2.map((item, index) => (
          <Card key={index} img={item.image} name={item.name} />
        ))}
      </Carousel>
      <Carousel
        className={styles.carousel}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
      >
        {dad.map((item, index) => (
          <Card key={index} img={item.image} name={item.name} />
        ))}
      </Carousel>
      <Carousel
        className={styles.carousel}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
      >
        {mom.map((item, index) => (
          <Card key={index} img={item.image} name={item.name} />
        ))}
      </Carousel>
      <Carousel
        className={styles.carousel}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
      >
        {dad2.map((item, index) => (
          <Card key={index} img={item.image} name={item.name} />
        ))}
      </Carousel>
    </div>
  );
}
