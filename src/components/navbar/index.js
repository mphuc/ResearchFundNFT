import { useState, useEffect } from "react";
import styles from "./Navbar.module.scss";
import discordIcon from "../../assets/discord.png";
import twitterIcon from "../../assets/twitter.png";

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
}) {
  const [navActive, setNavActive] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    if (!scrolling) {
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
    }
  }, [homeInView, galleryInView, roadmapInView, ourstoryInView, faqInView]);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <p>
          research <br /> funding <br /> club nft
        </p>
      </div>
      <div className={styles.nav}>
        <ul>
          <li
            className={`${navActive === 0 ? styles.active : ""}`}
            onClick={() => {
              homeId.current.scrollIntoView({ behavior: "smooth" });
              //setNavActive(0);
            }}
          >
            <p>home</p>
            <div class={styles.underline}></div>
          </li>
          <li
            className={`${navActive === 1 ? styles.active : ""}`}
            onClick={() => {
              galleryId.current.scrollIntoView({ behavior: "smooth" });
              // setNavActive(1);
            }}
          >
            <p>gallery</p>
            <div class={styles.underline}></div>
          </li>
          <li
            className={`${navActive === 2 ? styles.active : ""}`}
            onClick={() => {
              roadmapId.current.scrollIntoView({ behavior: "smooth" });
              // setNavActive(2);
            }}
          >
            <p>roadmap</p>
            <div class={styles.underline}></div>
          </li>
          <li
            className={`${navActive === 3 ? styles.active : ""}`}
            onClick={() => {
              ourstoryId.current.scrollIntoView({ behavior: "smooth" });
              // setNavActive(3);
            }}
          >
            <p>our story</p>
            <div class={styles.underline}></div>
          </li>
          <li
            className={`${navActive === 4 ? styles.active : ""}`}
            onClick={() => {
              faqId.current.scrollIntoView({ behavior: "smooth" });
              // setNavActive(4);
            }}
          >
            <p>faq</p>
            <div class={styles.underline}></div>
          </li>
        </ul>
      </div>
      <div className={styles.socials}>
        <img src={discordIcon} alt="" />
        <img src={twitterIcon} alt="" />
      </div>
    </div>
  );
}
