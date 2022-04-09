import styles from "./Footer.module.scss";
import discordIcon from "../../assets/discord.png";
import twitterIcon from "../../assets/twitter.png";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.logo}>
        <p>
          research <br /> funding <br /> club nft
        </p>
      </div>
      <div>
        <p>
          The NFT project dedicated to becoming the largest donor to research
          institutions studying the world’s deadliest diseases.
        </p>
      </div>
      <div>
        <p>
          Research Funding Club NFT{"  "}
          <span> Copyright 2022 All Rights Reserved</span>
        </p>
        <div className={styles.socials}>
          <a href="https://discord.gg/urDZcwnXTF">
            <img src={discordIcon} alt="" />
          </a>
          <a href="https://twitter.com/ResearchFundNFT">
            <img src={twitterIcon} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
}
