import styles from "./App.module.scss";
import Navbar from "./components/navbar";
import Main from "./components/mainContent";
import { useInView } from "react-intersection-observer";

function App() {
  const [homeRef, homeInView] = useInView({ threshold: 0.5 });
  const [galleryRef, galleryInView] = useInView({ threshold: 0.5 });
  return (
    <div className={styles.container}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.bgLayer}></div>
      <Navbar
        homeRef={homeRef}
        galleryRef={galleryRef}
        homeInView={homeInView}
        galleryInView={galleryInView}
      />
      <Main homeRef={homeRef} galleryRef={galleryRef} />
    </div>
  );
}

export default App;
