"use client";
import { useState, useRef, useEffect } from "react";
import styles from "../page.module.css";
import { display } from "../display";
import { useRouter } from "next/navigation";
import GameShell from "../components/gameshell"

export default function Home() {
    const [score, setScore] = useState(0);
    const POINTS = 10;
    const [selected, setSelected] = useState([]);
    const [locked, setLocked] = useState(false);
    const hadMistake = useRef(false);
    const router = useRouter();
    const FEEDBACK = { correct: "😊✅", wrong: "😢❌" };
    const [feedback, setFeedback] = useState(null);

    const [phase, setPhase] = useState("question");

    const handleChoice = (i) => {
        if (locked || !request) return;

        if (selected.includes(i)) {
            setSelected(selected.filter((s) => s !== i));
            return;
        }

        const next = [...selected, i];
        setSelected(next);
        if (next.length < 2) return;

        const choices = phase === "question" ? request.questionChoiceParts : request.answerChoiceParts;
        const correct = phase === "question" ? request.dialogue.question : request.dialogue.answer;
        const picked = next.map((idx) => choices[idx]);
        const isCorrect = picked[0] === correct[0] && picked[1] === correct[1];

        setLocked(true);
        setFeedback(isCorrect ? "correct" : "wrong");

        setTimeout(() => {
            setFeedback(null);
            setSelected([]);
            setLocked(false);

            if (!isCorrect) {
                hadMistake.current = true;
                return;
            }
            if (phase === "question") {
                setPhase("answer");
            } else {
                if (!hadMistake.current) setScore((s) => s + POINTS);
                hadMistake.current = false;
                setPhase("question");
                setRequest(getRandomRequest()); // siguiente cliente
            }
        }, 1000);
    };

    const getRandomRequest = () => {
        const randomDialogue = Math.floor(Math.random() * 5);
        const dialogue = display.level3.dialogue[randomDialogue];
        let questionChoiceParts = [" ", " ", " "];
        let answerChoiceParts = [" ", " ", " "];
        let choicePos = 0;
        let dialoguePos = 0;
        let randomIncorrectDialogue;
        // Generate question fragment options
        while (true){
            randomIncorrectDialogue = Math.floor(Math.random() * 5);

            if (randomIncorrectDialogue !== randomDialogue){
                questionChoiceParts[Math.floor(Math.random() * 3)] = display.level3.dialogue[randomIncorrectDialogue].question[Math.floor(Math.random() * 2)];
                break;
            };
        };

        while (choicePos < 3) {
            if (questionChoiceParts[choicePos] === " "){
                questionChoiceParts[choicePos] = dialogue.question[dialoguePos];
                dialoguePos++;
            };
            choicePos++;
        };

        choicePos = 0;
        dialoguePos = 0;

        // Generate answer fragment options
        while (true){
            randomIncorrectDialogue = Math.floor(Math.random() * 5);

            if (randomIncorrectDialogue !== randomDialogue){
                answerChoiceParts[Math.floor(Math.random() * 3)] = display.level3.dialogue[randomIncorrectDialogue].answer[Math.floor(Math.random() * 2)];
                break;
            };
        };

        while (choicePos < 3) {
            if (answerChoiceParts[choicePos] === " "){
                answerChoiceParts[choicePos] = dialogue.answer[dialoguePos];
                dialoguePos++;
            };
            choicePos++;
        };   
        return { dialogue, questionChoiceParts, answerChoiceParts };
    };

    const [request, setRequest] = useState(null);

    useEffect(() => {
        setRequest(getRandomRequest());
    }, []);
    return (
        <GameShell
            bgImage={display.level3.background_image}
            score={score}
            onMenuClick={() => router.push("/")}
            stretchBg
        >
            <div className={styles.chat}>
                <div className={`${styles.bubble} ${styles.bubbleClient}`}>
                    {feedback ? FEEDBACK[feedback] : request?.dialogue.text}
                </div>

                <div className={`${styles.bubble} ${styles.bubblePlayer}`}>
                    {selected.length > 0 ? (
                        (phase === "question" ? request.questionChoiceParts : request.answerChoiceParts)
                            .filter((_, i) => selected.includes(i))
                            .join(" ")
                            .replace(/\s+/g, " ")
                            .trim()
                    ) : (
                        <>
                            <span className={styles.waiting_dot}></span>
                            <span className={styles.waiting_dot}></span>
                            <span className={styles.waiting_dot}></span>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.choiceBar}>
                {(phase === "question" ? request?.questionChoiceParts : request?.answerChoiceParts)?.map((text, i) => (
                    <button
                        key={i}
                        className={`${styles.choiceButton} ${selected.includes(i) ? styles.choiceSelected : ""}`}
                        disabled={locked}
                        onClick={() => handleChoice(i)}
                    >
                        {text}
                    </button>
                ))}
            </div>
        </GameShell>
    );
}