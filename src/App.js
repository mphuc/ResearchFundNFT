import styles from "./App.module.scss";
import Navbar from "./components/navbar";
import Main from "./components/mainContent";

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.bgLayer}></div>
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
