import Main from "./components/mainContent";
import Mint from "./components/Mint";
import { useRef, useState } from "react";
import styles from "./App.module.scss";
import Navbar from "./components/navbar";
import { useInView } from "react-intersection-observer";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

function App() {
  // hooks for scroll indicator on navbar
  const [homeRef, homeInView] = useInView({ threshold: 0.5 });
  const [galleryRef, galleryInView] = useInView({ threshold: 0.5 });
  const [roadmapRef, roadmapInView] = useInView({ threshold: 0.5 });
  const [ourstoryRef, ourstoryInView] = useInView({ threshold: 0.5 });
  const [faqRef, faqInView] = useInView({ threshold: 0.8 });
  // ref links
  const homeId = useRef();
  const galleryId = useRef();
  const roadmapId = useRef();
  const ourstoryId = useRef();
  const faqId = useRef();
  //mobile navbar state
  const [nav, setNav] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.bgLayer}></div>
      <button onClick={() => setNav(!nav)} className={styles.menuBtn}>
        {!nav ? <MenuSharpIcon color="inherit" /> : <CloseSharpIcon />}
      </button>
      <Navbar
        homeId={homeId}
        galleryId={galleryId}
        roadmapId={roadmapId}
        ourstoryId={ourstoryId}
        faqId={faqId}
        homeInView={homeInView}
        galleryInView={galleryInView}
        roadmapInView={roadmapInView}
        ourstoryInView={ourstoryInView}
        faqInView={faqInView}
        nav={nav}
        setNav={setNav}
      />
      <Main
        homeId={homeId}
        galleryId={galleryId}
        roadmapId={roadmapId}
        ourstoryId={ourstoryId}
        faqId={faqId}
        homeRef={homeRef}
        galleryRef={galleryRef}
        roadmapRef={roadmapRef}
        ourstoryRef={ourstoryRef}
        faqRef={faqRef}
      />
    </div>
  );
}

export default App;
