import styles from "./Home.module.scss";
import previewImg from "../../nfts/MomDadBlue.png";
import heartIcon from "../../assets/heart.png";

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <h1>
          Research <br /> Funding Club NFT
        </h1>
        <p>
          The NFT project dedicated to becoming the largest donor to research
          institutions studying the world’s deadliest diseases.
        </p>
        <div className={styles.btns}>
          <button>Join Discord</button>
          <button>Learn More</button>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <img src={previewImg} alt="" />
          <div className={styles.infos}>
            <div>
              <div>
                <p>Lorem Ipsum</p>
                <p>0.51 RFC</p>
              </div>
              <div>
                <p>Ends in 56.44.45</p>
                <button>Bid</button>
              </div>
            </div>
            <img src={heartIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
