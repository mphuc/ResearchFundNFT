import styles from "./Home.module.scss";
import previewImg from "../../nfts/MomDadBlue.png";
import heartIcon from "../../assets/heart.png";

export default function Home({ id, linkId, currentRaised }) {
  return (
    <>
      <div className="refDummy" ref={linkId}></div>
      <div ref={id} className={styles.container}>
        <div>
          <h1>
            Research <br /> Fund NFT
          </h1>
          <p>
            Research Fund NFT is a non-profit DAO raising money for charity via
            NFTs.
          </p>
          <p>
            We drop NFT collections that are dedicated to lost loved ones. We
            honor your loved one by turning photos of them into 1-of-1 NFTs, and
            we donate 90% of the revenue from the drop to a charity of your
            choosing.
          </p>
          <p>
            Our first drop is minting now. As with all of our NFT drops, we're
            donating 90% of the revenue. We're splitting the 90% across two
            charities - American Cancer Society and American Heart Assocation.
          </p>
          {currentRaised && (
            <div className={styles.raised}>
              <h3 style={{ marginBottom: "20px" }}>
                Amount Raised:{" "}
                <span style={{ textDecoration: "underline" }}>
                  ${currentRaised}
                </span>
              </h3>
            </div>
          )}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <img src={previewImg} alt="" />
            <div className={styles.infos}>
              <div>
                <div>
                  <p>Mom Dad Blue #1</p>
                  <p>0.2 ETH</p>
                </div>
              </div>
              <img src={heartIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
