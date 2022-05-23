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
            Research <br /> Funding Club NFT
          </h1>
          <p>
            The NFT project dedicated to becoming the largest donor to research
            institutions studying the world's deadliest diseases.
          </p>
          <p>
            We're donating 90% of our first drop revenue to American Cancer
            Society and American Heart Assocation.
          </p>
          {currentRaised && (
            <div className={styles.raised}>
              <h3 style={{ marginBottom: "20px" }}>
                Current Raised:{" "}
                <span style={{ textDecoration: "underline" }}>
                  ${currentRaised}
                </span>
              </h3>
            </div>
          )}
          <div className={styles.btns}>
            <button
              onClick={() =>
                (window.location.href = "https://discord.gg/researchfundnft")
              }
            >
              Join Discord
            </button>
          </div>
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
        <div className={styles.logo}>
          <p>
            research <br /> funding <br /> club nft
          </p>
        </div>
      </div>
    </>
  );
}
