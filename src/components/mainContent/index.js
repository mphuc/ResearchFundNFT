import styles from "./Main.module.scss";
import Home from "../home";
import nftcalendar from "../../assets/NFTCalendar.png";

export default function Main() {
  return (
    <div className={styles.container}>
      <Home />
      <div className={styles.featured}>
        <p>Featured in</p>
        <img src={nftcalendar} alt="" />
      </div>
    </div>
  );
}
