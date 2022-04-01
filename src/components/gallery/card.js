import styles from "./Gallery.module.scss";
import previewImg from "../../nfts/MomDadBlue.png";

export default function Card({ img, name }) {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <img src={img} alt="" />
        <div className={styles.infos}>
          <div>
            <div>
              <p>{name}</p>
              <p>0.51 RFC</p>
            </div>
            <div>
              <p>Ends in 56.44.45</p>
              <button>Buy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
