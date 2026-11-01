"use client";
import { useState, useRef, useEffect } from "react";
import styles from "../page.module.css";
import { display } from "../display";
import { useRouter } from "next/navigation";
import GameShell from "../components/gameshell"

export default function Home() {
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState([]);
    const [locked, setLocked] = useState(false);
    const mistakes = useRef(0);
    const POINTS = 10;
    const router = useRouter();
    const FEEDBACK = { correct: "😊✅", wrong: "😢❌" };
    const [messages, setMessages] = useState([]);

    const [phase, setPhase] = useState("question");

    const chatRef = useRef(null);

    const messageSound = useRef(null);

    useEffect(() => {
        messageSound.current = new Audio("/audio/708605__marevnik__ui_pop_up.mp3");
    }, []);

    useEffect(() => {
        const el = chatRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages, selected]);

    useEffect(() => {
        if (messages.length === 0) return;
        const audio = messageSound.current;
        if (!audio) return;
        audio.currentTime = 0;
        audio.play().catch(() => {});
    }, [messages]);

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
        const playerText = picked.join(" ").replace(/\s+/g, " ").trim();

        setLocked(true);
        setSelected([]);
        setMessages((m) => [...m, { from: "player", text: playerText }]);

        setTimeout(() => {
            setMessages((m) => [
                ...m,
                { from: "client", text: isCorrect ? FEEDBACK.correct : FEEDBACK.wrong },
            ]);
        }, 500);

        setTimeout(() => {
        setLocked(false);

        if (!isCorrect) {
            mistakes.current += 1;
            return;
        }

        const earned = Math.max(POINTS - mistakes.current * 3, 2);
        setScore((s) => s + earned);
        mistakes.current = 0;

        if (phase === "question") {
            setPhase("answer");
        } else {
            setPhase("question");
            startClient();
        }
        }, 1200);
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

    const startClient = () => {
        const r = getRandomRequest();
        setRequest(r);
        setMessages([{ from: "client", text: r.dialogue.text }]);
    };

    useEffect(() => {
        startClient();
    }, []);

    const [request, setRequest] = useState(null);
    return (
        <GameShell
            bgImage={display.level3.background_image}
            score={score}
            onMenuClick={() => router.push("/")}
            stretchBg
            fixedHeight
        >
            <div className={styles.chat} ref={chatRef}>
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`${styles.bubble} ${m.from === "client" ? styles.bubbleClient : styles.bubblePlayer}`}
                    >
                        {m.text}
                    </div>
                ))}

                {!locked && (
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
                )}
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