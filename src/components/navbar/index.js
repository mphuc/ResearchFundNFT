import { useState, useEffect } from "react";
import styles from "./Navbar.module.scss";
import discordIcon from "../../assets/discord.png";
import twitterIcon from "../../assets/icons8-twitter-circled-240.png";
import etherscanIcon from "../../assets/etherscan-logo-circle.png";
import openseaIcon from "../../assets/opensea.png";

export default function Navbar({
  roadmapId,
  ourstoryId,
  faqId,
  homeId,
  galleryId,
  homeInView,
  galleryInView,
  roadmapInView,
  ourstoryInView,
  faqInView,
  nav,
  setNav,
}) {
  const [navActive, setNavActive] = useState(0);
  useEffect(() => {
    if (homeInView) {
      setNavActive(0);
    }
    if (galleryInView) {
      setNavActive(1);
    }
    if (roadmapInView) {
      setNavActive(2);
    }
    if (ourstoryInView) {
      setNavActive(3);
    }
    if (faqInView) {
      setNavActive(4);
    }
  }, [homeInView, galleryInView, roadmapInView, ourstoryInView, faqInView]);

  return (
    <div className={`${styles.container} ${nav ? styles.open : ""}`}>
      <div className={styles.nav}>
        <ul>
          <li
            className={`${navActive === 0 ? styles.active : ""}`}
            onClick={() => {
              homeId.current.scrollIntoView({ behavior: "smooth" });
              setNav(false);
            }}
          >
            <p>home</p>
            <div class={styles.underline}></div>
          </li>
          <li
            className={`${navActive === 1 ? styles.active : ""}`}
            onClick={() => {
              galleryId.current.scrollIntoView({ behavior: "smooth" });
              setNav(false);
            }}
          >
            <p>gallery</p>
            <div class={styles.underline}></div>
          </li>
          <li
            className={`${navActive === 2 ? styles.active : ""}`}
            onClick={() => {
              roadmapId.current.scrollIntoView({ behavior: "smooth" });
              setNav(false);
            }}
          >
            <p>roadmap</p>
            <div class={styles.underline}></div>
          </li>
          <li
            className={`${navActive === 3 ? styles.active : ""}`}
            onClick={() => {
              ourstoryId.current.scrollIntoView({ behavior: "smooth" });
              setNav(false);
            }}
          >
            <p>our story</p>
            <div class={styles.underline}></div>
          </li>
          <li
            className={`${navActive === 4 ? styles.active : ""}`}
            onClick={() => {
              faqId.current.scrollIntoView({ behavior: "smooth" });
              setNav(false);
            }}
          >
            <p>faq</p>
            <div class={styles.underline}></div>
          </li>
        </ul>
      </div>
      <div className={styles.socials}>
        <a
          href="https://twitter.com/ResearchFundNFT"
          target="_blank"
          rel="noopener"
        >
          <img src={twitterIcon} alt="" />
        </a>
        <a
          href="https://etherscan.io/address/0x39cEd238262Eb15B1409871bbcb5B89a478f68C4"
          target="_blank"
          rel="noopener"
        >
          <img src={etherscanIcon} alt="" />
        </a>
        <a
          href="https://opensea.io/collection/research-funding-club"
          target="_blank"
          rel="noopener"
        >
          <img src={openseaIcon} alt="" />
        </a>
      </div>
    </div>
  );
}
