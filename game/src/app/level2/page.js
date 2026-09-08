"use client";
import { useState, useRef, useEffect } from "react";
import styles from "../page.module.css";
import { display } from "../display";
import { useRouter } from "next/navigation";
import GameShell from "../components/gameshell"
import OptionsBubbles from "../components/optionsBubbles";

export default function Home() {
    const router = useRouter();
    const [gameState, setGameState] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [score, setScore] = useState(0);
    const [lastSelectCorrect, setLastSelectCorrect] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const dialogueAudioRef = useRef(null);
    const feedbackAudioRef = useRef(null);

    useEffect(() => {
        setGameState(RandomComponents());
    }, []);

    /* Play the audio track of the next customer */
    useEffect(() => {
        if (!gameState) return;
        playDialogue(gameState.audio_track);
    }, [gameState]);


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
        audio_track = display.level2.audio_prefix + audio_track;

        return {customer, audio_track, customer_sex};
    }

    /* Repeat the audio of the current customer */
    const repeatDialogue = () => {
        if (!gameState) return;
        playDialogue(gameState.audio_track);
    };

    /* Build the random components that will appear on the game */
    const RandomComponents = () => {
        /* Store selected dialogue */
        const dialogue_selection = display.level2.dialogue[Math.floor(Math.random() * display.level2.dialogue.length)];

        /* Store random selected customer and their voice */
        const random_customer = getRandomCustomer(dialogue_selection);

        const random_options = RandomOptions(dialogue_selection);

        return {
            dialogue_selection,
            customer: random_customer.customer,
            audio_track: random_customer.audio_track,
            customer_sex: random_customer.customer_sex,
            optionsToShow: random_options.optionsToShow,
            correctOption: dialogue_selection.answer,
        };
    };

    /* Select randomly the options to show in the bubbles */
    const RandomOptions = (dialogue_selection) => {
        let optionsToShow = [];
        const correctOption = dialogue_selection.answer;
        let option_pos = 1;
        let random_option;

        optionsToShow[0] = correctOption;

        while (option_pos < 3){
            random_option = display.level2.options[Math.floor(Math.random() * display.level2.options.length)];
            if (random_option != optionsToShow[0]){
                optionsToShow[option_pos] = random_option;
                option_pos++;
            }
        }
        return {
            optionsToShow
        };
    };

    const handleSelect = (selectedOption) => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setSelectedOption(selectedOption);

        const isCorrect = selectedOption === gameState.correctOption;
        setLastSelectCorrect(isCorrect);


        if (isCorrect) {
            setScore((prev) => prev + 100);
        }

        playFeedback(isCorrect);

        setTimeout(() => {
            regenerate();
            setIsTransitioning(false);
            setSelectedOption(null);
        }, 2000);
    };

  return (
    <GameShell bgImage={display.all_levels.background_image} score={score} onMenuClick={() => router.push("/")}>
        <button className={styles.button_repeat} onClick={repeatDialogue} aria-label="Repetir audio"> 🔊 </button>
        {gameState && (
            <>
                <img src={gameState.customer} className={styles.customer} alt="customer" />
                <OptionsBubbles
                    options={gameState.optionsToShow}
                    onSelect={handleSelect}
                    disabled={isTransitioning}
                    selectedOption={selectedOption}
                    correctOption={gameState.correctOption}
                />
            </>
        )}
        <img src={"/image/assets/counter.png"} className={styles.counter} alt="counter" draggable={false}/>
    </GameShell>
  );
}