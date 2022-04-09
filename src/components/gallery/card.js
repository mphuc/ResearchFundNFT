import styles from "./Gallery.module.scss";

export default function Card({ img, name }) {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <img src={img} alt="" />
        <div className={styles.infos}>
          <div>
            <div>
              <p>{name}</p>
              <p>0.2 ETH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
