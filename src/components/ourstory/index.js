import styles from "./Ourstory.module.scss";

export default function Ourstory({ id, linkId }) {
  return (
    <div style={{ position: "relative" }}>
      <div ref={linkId} className="refDummy"></div>
      <div ref={id} className={styles.container}>
        <h1>Our Story</h1>
        <p>
          Read about our story{" "}
          <a
            href="https://medium.com/@ResearchFundingClub/research-funding-club-nft-f5ee39dd7ccb"
            rel="noreferrer"
            target="_blank"
          >
            here.
          </a>
        </p>
      </div>
    </div>
  );
}
