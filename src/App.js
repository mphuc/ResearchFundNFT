import styles from "./App.module.scss";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <div className={styles.bgLayer}></div>
      <Navbar />
    </div>
  );
}

export default App;
