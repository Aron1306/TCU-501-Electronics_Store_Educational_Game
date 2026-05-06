"use client";
import { useEffect, useRef } from "react";
import styles from "./page.module.css";

export default function Home() {  
  /*For background music*/
  const audioRef = useRef(null);
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.3;
    const playAudio = () => {
      audio.play().catch(() => {
      });
    };
    playAudio();
    window.addEventListener("click", playAudio);
    return () => {
      audio.pause();
      audio.currentTime = 0;
      window.removeEventListener("click", playAudio);
    };
  }, []);
  return (
    <div className={styles.page}>
      <audio ref={audioRef} loop>
        <source src="/audio/767856__sunixmuz__sunixmuz-bizarre-place-free-ccby.mp3" type="audio/mpeg" />
      </audio>
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
      <button className={`${styles.button} ${styles.button_help}`}>
        <span className={styles.help_text}>?</span>
      </button>
      <button className={`${styles.button} ${styles.button_mute}`} onClick={() => {audioRef.current.muted = !audioRef.current.muted}}>
      🔇
      </button>
    </div>
  );
}
