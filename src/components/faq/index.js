import styles from "./Faq.module.scss";
import expandIcon from "../../assets/expand.png";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

export default function Faq({ id, linkId }) {
  return (
    <div style={{ position: "relative" }}>
      <div ref={linkId} className="refDummy"></div>
      <div ref={id} className={styles.container}>
        <h1>FAQ</h1>
        <Accordion className={styles.accordion}>
          <AccordionSummary
            className={styles.accTitle}
            expandIcon={<img src={expandIcon} />}
          >
            <h3>What are our NFTs?</h3>
          </AccordionSummary>
          <AccordionDetails className={styles.accDetails}>
            <p>
              Research Fund NFT are NFTs following the ERC-721 standard. The
              first drop is a collection of 25 NFT's that are portrait's of
              different photos we found of our family. There's 5 different
              portrait's in the first drop - all done by a different artist.
              Each portrait has 5 different versions, with different backgrounds
              and different visual effects. There's one punk inspired version of
              each portrait.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion className={styles.accordion}>
          <AccordionSummary
            className={styles.accTitle}
            expandIcon={<img src={expandIcon} />}
          >
            <h3>Why buy one of our NFTs?</h3>
          </AccordionSummary>
          <AccordionDetails className={styles.accDetails}>
            <p>
              We're donating 90% of revenue to charity. On our first drop, we'll
              donate 45% of all proceeds to the American Heart Association, and
              another 45% to American Cancer Society. For every transaction that
              occurs after the first drop, 5% of the royalties will be set aside
              for donation. We'll let our owners decide the institution.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion className={styles.accordion}>
          <AccordionSummary
            className={styles.accTitle}
            expandIcon={<img src={expandIcon} />}
          >
            <h3>Where will the proceeds go?</h3>
          </AccordionSummary>
          <AccordionDetails className={styles.accDetails}>
            <p>
              90% of the first drop proceeds will go to American Heart
              Assocation and American Cancer Society. 5% of all royalties from
              transactions after the first drop will be set aside for charity
              and our NFT holders will help us decide where to donate.
            </p>
            <p>
              The other 10% of the proceeds, and any royalties on transactions
              in the future will go towards the following:
            </p>
            <p className={styles.dotted}>
              <span className={styles.smallDot}></span>
              Hiring quality digital artists to create the next drop of NFTs
            </p>
            <p className={styles.dotted}>
              <span className={styles.smallDot}></span>
              Hiring developers to help build the RFC token that will be used to
              award hodlers of our NFT's
            </p>
            <p className={styles.dotted}>
              <span className={styles.smallDot}></span>
              Hiring marketers to help fulfill the goal of becoming the largest
              donor to research institutions studying the world's deadliest
              diseases
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
