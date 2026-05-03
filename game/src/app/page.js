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
        <button className={`${styles.button} ${styles.button_level}`}></button>
        <button className={`${styles.button} ${styles.button_level}`}></button>
        <button className={`${styles.button} ${styles.button_level}`}></button>
        <button className={`${styles.button} ${styles.button_level}`}></button>
      </div>
      <button className={`${styles.button} ${styles.button_help}`}></button>
    </div>
  );
}
