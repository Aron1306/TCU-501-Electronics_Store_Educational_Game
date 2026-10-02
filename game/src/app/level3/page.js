"use client";
import { useState, useRef, useEffect } from "react";
import styles from "../page.module.css";
import { display } from "../display";
import { useRouter } from "next/navigation";
import GameShell from "../components/gameshell"

export default function Home() {
    const [score, setScore] = useState(0);
    const [gameState, setGameState] = useState(null);
    const router = useRouter();

    const [phase, setPhase] = useState("question");

    const handleChoice = (text) => {
        console.log("Elegido:", text);
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
        return { questionChoiceParts, answerChoiceParts };
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
            {request && (
                <div
                    onClick={() => setRequest(getRandomRequest())}
                    style={{ position: "relative", zIndex: 10, background: "white", color: "black", padding: 16, cursor: "pointer" }}
                >
                    <p>Question: {JSON.stringify(request.questionChoiceParts)}</p>
                    <p>Answer: {JSON.stringify(request.answerChoiceParts)}</p>
                    <p>(click para generar otra)</p>
                </div>
            )}
            <div className={styles.choiceBar}>
                {(phase === "question" ? request?.questionChoiceParts : request?.answerChoiceParts)?.map((text, i) => (
                    <button
                        key={i}
                        className={styles.choiceButton}
                        onClick={() => handleChoice(text)}
                    >
                        {text}
                    </button>
                ))}
            </div>
        </GameShell>
    );
}