import styles from "./Navbar.module.scss";
import discordIcon from "../../assets/discord.png";
import twitterIcon from "../../assets/twitter.png";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <p>
          research <br /> funding <br /> club nft
        </p>
      </div>
      <div className={styles.nav}>
        <button>home</button>
        <button>gallery</button>
        <button>roadmap</button>
        <button>our story</button>
        <button>faq</button>
      </div>
      <div className={styles.socials}>
        <img src={discordIcon} alt="" />
        <img src={twitterIcon} alt="" />
      </div>
    </div>
  );
}
