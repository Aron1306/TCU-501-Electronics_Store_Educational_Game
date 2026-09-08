import styles from "../page.module.css";
import { useEffect, useRef, useState } from "react";

export default function GameShell(props) {
    const bgImage = props.bgImage;
    const score = props.score;
    const duration = props.duration ?? 60
    const onMenuClick = props.onMenuClick;
    const children = props.children;

    const [timeLeft, setTimeLeft] = useState(duration);
    const [showModal, setShowModal] = useState(false);

    const endAudioRef = useRef(null);

    /* Countdown */
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    /* Show modal when time runs out */
    useEffect(() => {
        if (timeLeft === 0) {
            setShowModal(true);
        }
    }, [timeLeft]);

    /* Preload the end-game audio on mount */
    useEffect(() => {
        const audio = new Audio("/audio/397355__plasterbrain__tada-fanfare-a.flac");
        audio.preload = "auto";
        endAudioRef.current = audio;
    }, []);

    /* Play it when the modal shows */
    useEffect(() => {
        if (showModal) {
            endAudioRef.current.currentTime = 0;
            endAudioRef.current.play().catch(() => {});
        }
    }, [showModal]);

    return (
        <div className={`${styles.page} ${styles.page_main_menu}`} style={{ backgroundImage: `url('${bgImage}')` }}>
            <div className={styles.score}>Score: {score}</div>
            <div className={styles.timer}>{timeLeft}</div>
            <button className={`${styles.button} ${styles.button_back}`} onClick={onMenuClick}> Menu </button>

            {children}

            {showModal && (
                <div className={styles.modal_overlay}>
                    <div className={styles.modal}>
                        <h2> Your Score: {score} </h2>
                        <button className={styles.start_button} onClick={onMenuClick}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

