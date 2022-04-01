import styles from "./Main.module.scss";
import Home from "../home";
import Gallery from "../gallery";
import nftcalendar from "../../assets/NFTCalendar.png";

export default function Main({ homeRef, galleryRef }) {
  return (
    <div className={styles.container}>
      <Home id={homeRef} />
      <div className={styles.featured}>
        <p>Featured in</p>
        <img src={nftcalendar} alt="" />
      </div>
      <div className={styles.donations}>
        <h1>Donations</h1>
        <div>
          <div>
            <p>
              <span>2,164</span>
              <br />
              American Heart Association
            </p>
          </div>
          <div>
            <p>
              <span>4,321</span>
              <br />
              Total Donations
            </p>
          </div>
          <div>
            <p>
              <span>2,157</span>
              <br />
              American Cancer Society
            </p>
          </div>
        </div>
      </div>
      <Gallery id={galleryRef} />
    </div>
  );
}
