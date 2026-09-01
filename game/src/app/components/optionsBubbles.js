"use client";
import { useRef } from "react";
import Bubble from "./bubble";
import styles from "../page.module.css";

export default function OptionsBubbles({ options, onSelect, disabled, selectedOption, correctOption }) {
    const containerRef = useRef(null);

    const getStatus = (opt) => {
        if (selectedOption === null) return "idle";
        if (opt === correctOption) return "correct";
        if (opt === selectedOption) return "incorrect";
        return "idle";
    };

    return (
        <div ref={containerRef} className={styles.bubbles_container}>
            {options.map((opt, i) => (
                <Bubble
                    key={opt + i}
                    text={opt}
                    containerRef={containerRef}
                    onClick={() => onSelect(opt)}
                    disabled={disabled}
                    status={getStatus(opt)}
                />
            ))}
        </div>
    );
}
