import styles from "./Ourstory.module.scss";

export default function Ourstory({ id, linkId }) {
  return (
    <div style={{ position: "relative" }}>
      <div ref={linkId} className="refDummy"></div>
      <div ref={id} className={styles.container}>
        <h1>Our Story</h1>
        <p>
          3 weeks before my 30th birthday in 2019, I lost my mother to a long
          battle with cancer. Just 2 years later, my father passed to a cardiac
          event in his home. These two events led me to working on Research
          Funding Club. I have a personal stake in advancing research on cancer
          and heart disease. One way to do that is through donations — and a
          powerful way to raise money is through NFT's.
        </p>
        <p>
          <br />
          According to the CDC data, heart disease is the top killer in the US,
          followed by cancer. Our mission at Research Funding Club, is help fund
          the science that studies these deadliest diseases, using the power of
          NFT's.
        </p>
      </div>
    </div>
  );
}
