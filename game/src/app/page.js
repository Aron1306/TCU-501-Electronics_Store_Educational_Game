import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
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
