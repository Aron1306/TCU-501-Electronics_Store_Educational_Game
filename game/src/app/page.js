import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.level_button_array}>
        <button className={styles.level_button}>1</button>
        <button className={styles.level_button}>2</button>
        <button className={styles.level_button}>3</button>
        <button className={styles.level_button}>4</button>
        <button className={styles.help_button}>?</button>
      </div>
    </div>
  );
}
