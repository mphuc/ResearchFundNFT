import styles from "./Main.module.scss";
import Home from "../home";
import Gallery from "../gallery";
import Roadmap from "../roadmap";
import Ourstory from "../ourstory";
import Faq from "../faq";
import Footer from "../footer";
import nftcalendar from "../../assets/NFTCalendar.png";

export default function Main({
  homeRef,
  galleryRef,
  roadmapRef,
  ourstoryRef,
  faqRef,
  roadmapId,
  ourstoryId,
  faqId,
  homeId,
  galleryId,
}) {
  return (
    <div className={styles.container}>
      <Home id={homeRef} linkId={homeId} />
      <div className={styles.featured}>
        <div>
          <p>Featured in</p>
          <img src={nftcalendar} alt="" />
        </div>
        <div className={styles.wrapper}>
          <div>
            <h2>
              NFTS
              <br />
              MINTED
            </h2>
            <p>
              3 of <span>25</span>
            </p>
            <button>Mint NFT</button>
          </div>
        </div>
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
      <Gallery id={galleryRef} linkId={galleryId} />
      <Roadmap id={roadmapRef} linkId={roadmapId} />
      <Ourstory id={ourstoryRef} linkId={ourstoryId} />
      <Faq id={faqRef} linkId={faqId} />
      <Footer />
    </div>
  );
}
