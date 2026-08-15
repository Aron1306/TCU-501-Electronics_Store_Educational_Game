"use client";
import { useEffect, useRef } from "react";
import styles from "../page.module.css";

export default function Bubble({ text, containerRef, onClick, disabled }) {
    const bubbleRef = useRef(null);

    const pos = useRef({
        x: Math.random() * 300,
        y: Math.random() * 300,
    });
    const vel = useRef({
        x: (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random()),
        y: (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random()),
    });

    useEffect(() => {
        let animationId;

        const animate = () => {
            const container = containerRef.current;
            const bubble = bubbleRef.current;

            if (!container || !bubble) {
                animationId = requestAnimationFrame(animate);
                return;
            }

            const containerRect = container.getBoundingClientRect();
            const bubbleRect = bubble.getBoundingClientRect();

            pos.current.x += vel.current.x;
            pos.current.y += vel.current.y;

            if (pos.current.x <= 0 || pos.current.x + bubbleRect.width >= containerRect.width) {
                vel.current.x *= -1;
                pos.current.x = Math.max(0, Math.min(pos.current.x, containerRect.width - bubbleRect.width));
            }
            if (pos.current.y <= 0 || pos.current.y + bubbleRect.height >= containerRect.height) {
                vel.current.y *= -1;
                pos.current.y = Math.max(0, Math.min(pos.current.y, containerRect.height - bubbleRect.height));
            }

            bubble.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [containerRef]);

    return (
        <button
            ref={bubbleRef}
            onClick={onClick}
            disabled={disabled}
            className={styles.bubble}
        >
            {text}
        </button>
    );
}