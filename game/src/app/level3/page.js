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
    return (
        <GameShell
            bgImage={display.level3.background_image}
            score={score}
            onMenuClick={() => router.push("/")}
            stretchBg
        >
        </GameShell>
    );
}