"use client";
import { useEffect, useRef } from "react";
import styles from "../page.module.css";

export default function Bubble({ text, containerRef, onClick, disabled, status, bubblesRef, index }) {
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
            const radius = Math.max(bubbleRect.width, bubbleRect.height) / 2;

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

            if (bubblesRef?.current) {
                const myCenter = {
                    x: pos.current.x + bubbleRect.width / 2,
                    y: pos.current.y + bubbleRect.height / 2,
                };

                bubblesRef.current.forEach((other, j) => {
                    if (j === index || !other) return;

                    const dx = myCenter.x - other.x;
                    const dy = myCenter.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = radius + other.radius;

                    if (dist > 0 && dist < minDist) {
                        const overlap = minDist - dist;
                        const nx = dx / dist;
                        const ny = dy / dist;
                        
                        // Avoid overlap
                        pos.current.x += nx * overlap;
                        pos.current.y += ny * overlap;

                        // Bounce
                        const dot = vel.current.x * nx + vel.current.y * ny;
                        if (dot < 0) {
                            vel.current.x -= 2 * dot * nx;
                            vel.current.y -= 2 * dot * ny;
                        }
                    }
                });

                // Update position in the shared register
                bubblesRef.current[index] = {
                    x: pos.current.x + bubbleRect.width / 2,
                    y: pos.current.y + bubbleRect.height / 2,
                    radius,
                };
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
            className={`${styles.bubble} ${status === "correct" ? styles.bubble_correct : ""} ${status === "incorrect" ? styles.bubble_incorrect : ""}`}
        >
            {text}
        </button>
    );
}