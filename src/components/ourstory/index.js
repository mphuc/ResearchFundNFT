import styles from "./Ourstory.module.scss";

export default function Ourstory({ id, linkId }) {
  return (
    <div style={{ position: "relative" }}>
      <div ref={linkId} className="refDummy"></div>
      <div ref={id} className={styles.container}>
        <h1>Our Story</h1>
        <p>
          I started working on Research Funding Club as a way to explore the
          Web3 ecosystem (I'm a software engineer and have founded and scaled
          Web2 tech companies - and have been following Web3 for a couple years
          now). <br /> I lost both of my parents over the span of 2 years, one
          to cancer and one to a cardiac event. After finding boxes of old
          photos in our parents house, I thought about getting some of them made
          into nice pieces of art and minting them as NFTs. Originally I just
          wanted to preserve some memories, and learn about Web3. After seeing
          some of the other charity projects in the Web3 space, I thought it
          would be awesome to work on an NFT project for a good cause.
        </p>
      </div>
    </div>
  );
}
