"use client";
import { useState, useRef, useEffect } from "react";
import styles from "../page.module.css";
import { display } from "../Dialogue";
import { useRouter } from "next/navigation";
import GameShell from "../components/gameshell"

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameState, setGameState] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [score, setScore] = useState(0);
    const [lastDropCorrect, setLastDropCorrect] = useState(null);

    const dialogueAudioRef = useRef(null);
    const endAudioRef = useRef(null);
    const feedbackAudioRef = useRef(null);

    useEffect(() => {
        setGameState(RandomComponents());
    }, []);

    /* When time reaches 0, go back to the main menu (TODO: Do something else when time runs out) */
    useEffect(() => {
        if (timeLeft === 0) {
            setShowModal(true);
        }

    }, [timeLeft]);

    /* 60 second countdown */
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

    /* Play the audio track of the next customer */
    useEffect(() => {
        if (!gameState) return;
        playDialogue(gameState.audio_track);
    }, [gameState]);

    /* Play 'tada' audio when showing the score at the end of the game */
    useEffect(() => {
        if (showModal) {
            const tadaAudio = new Audio("/audio/397355__plasterbrain__tada-fanfare-a.flac");
            endAudioRef.current = tadaAudio;
            tadaAudio.play().catch(() => {});
        }
    }, [showModal]);

    /* Auxiliary function to play the audio track of the customer request */
    const playDialogue = (path) => {
        if (dialogueAudioRef.current) {
            dialogueAudioRef.current.pause();
        }

        const audio = new Audio(path);
        dialogueAudioRef.current = audio;
        audio.play().catch(() => {});
    };

    /* Auxiliary function to play the audio track of the customer feedback */
    const playFeedbackAudio = (path) => {
        const audio = new Audio(path);
        feedbackAudioRef.current = audio;
        audio.play().catch(() => {});
    };

    /* Next customer */
    const regenerate = () => {
        setGameState(RandomComponents());
    };

    /*Handle items being dropped in the designed area*/
    const handleDrop = (e) => {
        e.preventDefault();
        if (isTransitioning) return;
        
        const data = e.dataTransfer.getData("deviceIndex");
        if (data === "") return; // ignore extern drops

        setIsTransitioning(true);

        const index = Number(data);
        const isCorrect =
            index === gameState.correct_device_pos;

        setLastDropCorrect(isCorrect);

        if (isCorrect) {
            setScore(prev => prev + 100);
            
        }

        playFeedback(isCorrect);

        setTimeout(() => {
            regenerate();
            setIsTransitioning(false);
        }, 2000);
    };

    /* Play feedback after each selection of the player */
    const playFeedback = (isCorrect) => {
        const feedbackArray = isCorrect
            ? display.all_levels[`${gameState.customer_sex}_correct`]
            : display.all_levels[`${gameState.customer_sex}_incorrect`];

        playFeedbackAudio(`${display.all_levels.feedback_prefix}${feedbackArray[Math.floor(Math.random() * feedbackArray.length)]}`);
    };

    /* Randomly decide a customer and their voice */
    const getRandomCustomer = (dialogue_selection) => {
        /* Store selected customer and their audio track */
        let customer;
        let audio_track;
        let customer_sex;

        /* Decide the sex of the next customer */
        const random_customer_sex = Math.floor(Math.random() * 2);

        /* Decide the next customer and their audio track */
        if (random_customer_sex === 0){
            customer = display.all_levels.male_customers[Math.floor(Math.random() * display.all_levels.male_customers.length)];
            audio_track = dialogue_selection.audio_male[Math.floor(Math.random() * dialogue_selection.audio_male.length)];
            customer_sex = "male";
        } else {
            customer = display.all_levels.female_customers[Math.floor(Math.random() * display.all_levels.female_customers.length)];
            audio_track = dialogue_selection.audio_female[Math.floor(Math.random() * dialogue_selection.audio_female.length)];

            customer.includes("female1") ? customer_sex =  "female1" : customer_sex = "female2";
        }

        /* Add path to the selected customer image and audio track */
        customer = display.all_levels.customer_prefix + customer;
        audio_track = display.level1.audio_prefix + audio_track;

        return {customer, audio_track, customer_sex};
    }

    /* Randomly decide the devices to be shown on screen, assuring there is always a correct one */
    const getRandomDevices = (dialogue_selection) => {
        /* Devices array */
        let devices_array = [null, null, null];

        /* Store correct device position in the devices array and incorrect devices */
        const correct_device_pos = Math.floor(Math.random() * devices_array.length);
        let incorrect_device;

        devices_array[correct_device_pos] = display.all_levels.device_prefix + dialogue_selection.image;

        /* Fill the device array with random devices, but assure there is always a correct one */
        for (let pos = 0; pos < devices_array.length; pos++){
            if (pos !== correct_device_pos){
                /* Avoid inserting the same image twice*/
                do {
                    incorrect_device = display.all_levels.devices[Math.floor(Math.random() * display.all_levels.devices.length)];
                } while (devices_array.includes(display.all_levels.device_prefix + incorrect_device));

                devices_array[pos] = display.all_levels.device_prefix + incorrect_device;
            }
        }

        return {devices_array, correct_device_pos};
    }

    /* Repeat the audio of the current customer */
    const repeatDialogue = () => {
        if (!gameState) return;
        playDialogue(gameState.audio_track);
    };

    /* Build the random components that will appear on the game */
    const RandomComponents = () => {
        /* Store selected dialogue */
        const dialogue_selection = display.level1.dialogue[Math.floor(Math.random() * display.level1.dialogue.length)];

        /* Store random selected customer and their voice */
        const random_customer = getRandomCustomer(dialogue_selection);

        /* Store random selected devices */
        const random_devices = getRandomDevices(dialogue_selection);

        return {
            dialogue_selection,
            customer: random_customer.customer,
            audio_track: random_customer.audio_track,
            customer_sex: random_customer.customer_sex,
            devices_array: random_devices.devices_array,
            correct_device_pos: random_devices.correct_device_pos,
        };
    };
  return (
    <GameShell bgImage={display.all_levels.background_image} score={score} timeLeft={timeLeft} onMenuClick={() => router.push("/")} showModal={showModal}>
        <button className={styles.button_repeat} onClick={repeatDialogue} aria-label="Repetir audio"> 🔊 </button>
        {gameState && (
            <>
                <img
                    src={gameState.customer}
                    className={styles.customer}
                    alt="customer"
                />
                <div className={styles.device_row}>
                    {gameState.devices_array.map((device, i) => (
                    <div
                        key={i}
                        draggable
                        onDragStart={(e) =>
                            e.dataTransfer.setData("deviceIndex", i)
                        }
                        style={{ position: "relative" }}
                    >
                        <img
                        src={device}
                        className={styles.device}
                        />
                        {isTransitioning && i === gameState.correct_device_pos && (
                            <div className={styles.device_highlight} />
                        )}
                    </div>
                    ))}
                </div>
            </>
        )}
        <img
            src={"/image/assets/counter.png"}
            className={styles.counter}
            alt="counter"
            draggable={false}
        />
        <div
            className={styles.customer_slot}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        />
        {isTransitioning && (
            <img
                src={lastDropCorrect ? "/image/assets/correct.png" : "/image/assets/incorrect.png"}
                className={styles.feedback_icon}
                alt="feedback"
            />
        )}
    </GameShell>
  );
}