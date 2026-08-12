"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { display } from "./Dialogue";
import styles from "./page.module.css";

export default function Home() {

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  /*For click sounds*/
  const clickSoundRef = useRef(null);
  useEffect(() => {
    clickSoundRef.current = new Audio("/audio/611962__cmartins10__press-button.wav");
  }, []);
  const playClick = () => {
    const sound = clickSoundRef.current;
    sound.currentTime = 0;
    sound.play();
  };

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
    <div className={`${styles.page} ${styles.page_main_menu}`} style={{ backgroundImage: "url('/image/assets/main_menu_bg.jpg')"}}>
      <audio ref={audioRef} loop>
        <source src="/audio/767856__sunixmuz__sunixmuz-bizarre-place-free-ccby.mp3" type="audio/mpeg" />
      </audio>
      <h1 className={styles.title}>
        <span className={styles.title_top}>At The</span>
        <span className={styles.title_bottom}>Electronics Store</span>
      </h1>
      <div className={styles.level_button_array}>
        <button className={`${styles.button} ${styles.button_level}`} onClick={() => {playClick();setShowModal(true)}}>
          <div className={styles.dot} style={{ gridArea: "2 / 2" }}></div>
        </button>
        <button className={`${styles.button} ${styles.button_level}`} onClick={playClick}>
          <div className={styles.dot} style={{ gridArea: "1 / 1" }}></div>
          <div className={styles.dot} style={{ gridArea: "3 / 3" }}></div>
        </button>
        <button className={`${styles.button} ${styles.button_level}`} onClick={playClick}>
          <div className={styles.dot} style={{ gridArea: "1 / 1" }}></div>
          <div className={styles.dot} style={{ gridArea: "2 / 2" }}></div>
          <div className={styles.dot} style={{ gridArea: "3 / 3" }}></div>
        </button>
        <button className={`${styles.button} ${styles.button_level}`} onClick={playClick}>
          <div className={styles.dot} style={{ gridArea: "1 / 1" }}></div>
          <div className={styles.dot} style={{ gridArea: "1 / 3" }}></div>
          <div className={styles.dot} style={{ gridArea: "3 / 1" }}></div>
          <div className={styles.dot} style={{ gridArea: "3 / 3" }}></div>
        </button>
      </div>
      <button className={`${styles.button} ${styles.button_help}`} onClick={playClick}>
        <span className={styles.help_text}>?</span>
      </button>
      <button className={`${styles.button} ${styles.button_mute}`} onClick={() => {audioRef.current.muted = !audioRef.current.muted}}>
      🔇
      </button>
      <div className={styles.logos}>
        <img src="/image/assets/ucr-logo.png" alt="UCR logo" className={styles.logos_ucr}/>
        <img src="/image/assets/tcu-logo.png" alt="TCU logo" className={styles.logos_tcu}/>
      </div>
      {showModal && (
        <div className={styles.modal_overlay}>
            <div className={styles.modal}>
                <button
                    className={styles.close_button}
                    onClick={() => {
                        playClick();
                        setShowModal(false);
                    }}
                >
                    ✕
                </button>
                <h2>Level 1 Rules</h2>
                {display.level1.instructions.map((instruction, i) => (
                    <p key={i}>
                        {instruction}
                    </p>
                ))}
                <button
                    className={styles.start_button}
                    onClick={() => {
                        playClick();
                        router.push("/level1");
                    }}
                >
                    Start
                </button>
            </div>
        </div>
      )}
    </div>
  );
}
