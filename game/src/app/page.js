import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        <span className={styles.title_top}>At The</span>
        <span className={styles.title_bottom}>Electronics Store</span>
      </h1>
      <div className={styles.level_button_array}>
        <button className={`${styles.button} ${styles.button_level}`}>
          <div className={styles.dot} style={{ gridArea: "2 / 2" }}></div>
        </button>
        <button className={`${styles.button} ${styles.button_level}`}>
          <div className={styles.dot} style={{ gridArea: "1 / 1" }}></div>
          <div className={styles.dot} style={{ gridArea: "3 / 3" }}></div>
        </button>
        <button className={`${styles.button} ${styles.button_level}`}>
          <div className={styles.dot} style={{ gridArea: "1 / 1" }}></div>
          <div className={styles.dot} style={{ gridArea: "2 / 2" }}></div>
          <div className={styles.dot} style={{ gridArea: "3 / 3" }}></div>
        </button>
        <button className={`${styles.button} ${styles.button_level}`}>
          <div className={styles.dot} style={{ gridArea: "1 / 1" }}></div>
          <div className={styles.dot} style={{ gridArea: "1 / 3" }}></div>
          <div className={styles.dot} style={{ gridArea: "3 / 1" }}></div>
          <div className={styles.dot} style={{ gridArea: "3 / 3" }}></div>
        </button>
      </div>
      <button className={`${styles.button} ${styles.button_help}`}></button>
    </div>
  );
}
