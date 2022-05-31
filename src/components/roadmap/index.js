import styles from "./Roadmap.module.scss";
import doneIcon from "../../assets/done.png";

export default function Roadmap({ id, linkId }) {
  return (
    <div style={{ position: "relative" }}>
      <div ref={linkId} className="refDummy"></div>
      <div ref={id} className={styles.container}>
        <h1>Roadmap</h1>
        <div className={styles.checked}>
          <div>
            <div className={styles.done}>
              <img src={doneIcon} alt="" />
            </div>
          </div>
          <div>
            <p>
              <span>Q1 2022 </span>
              <br />
              Commission artists to create our NFT art. Launch website. Begin
              developing the smart contract.
            </p>
          </div>
        </div>
        <div className={styles.checked}>
          <div>
            <div className={styles.done}>
              <img src={doneIcon} alt="" />
            </div>
          </div>
          <div>
            <p>
              <span>Q2 2022</span>
              <br />
              Community Building. Start working on building the community and
              marketing the project. Launch discord and twitter. Drop the first
              collection.
            </p>
          </div>
        </div>
        <div>
          <div>
            <div className={styles.done}>
              <img src={doneIcon} alt="" />
            </div>
          </div>
          <div>
            <p>
              <span>Q3 2022</span>
              <br />
              Sell out the first 25 NFTs. Reveal all 25 NFTs. Donate 90% of our
              revenue to American Heart Association and American Cancer Society.
              Use the other 10% of revenue to hire new artists for creating the
              art for the next NFT drop.
            </p>
          </div>
        </div>
        <div>
          <div>
            <div className={styles.done}>
              <img src={doneIcon} alt="" />
            </div>
          </div>
          <div>
            <p>
              <span>Q4 2022 </span>
              <br />
              Drop the second collection of 10,000 NFT's and make more donations
              to charity. Continue marketing our vision. Expand business model
              to allow people to commemorate their lost loved ones using our NFT
              platform. Customers would be able to commission us to create art
              that commemorates their lost loved one, and we'll work with them
              to create their own unique NFT drop.
            </p>
          </div>
        </div>
        <div>
          <div>
            <div className={styles.done}>
              <img src={doneIcon} alt="" />
            </div>
          </div>
          <div>
            <p>
              <span>Q1 2023 and beyond</span>
              <br />
              Continue commissioning artists to create more NFTs and continue
              doing drops and donating money. Define our tokenomics to be able
              to bring more value to our community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
