import styles from "../page.module.css";

export default function GameShell(props) {
    const bgImage = props.bgImage;
    const score = props.score;
    const timeLeft = props.timeLeft;
    const onMenuClick = props.onMenuClick;
    const showModal = props.showModal;
    const children = props.children;

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

