"use client";
import { useEffect, useRef } from "react";
import styles from "../page.module.css";

export default function Home() {
    
    /*Handle items being dropped in the designed area*/
    const handleDrop = (e) => {
        e.preventDefault();
        const device = e.dataTransfer.getData("text/plain");
    };
  return (
    <div className={`${styles.page} ${styles.page_main_menu}`} style={{ backgroundImage: "url('/image/assets/store_bg.jpg')"}}>
        <img
            src="/image/clients/man1.png"
            className={styles.customer}
            alt="customer"
        />
        <img
            src="/image/assets/counter.png"
            className={styles.counter}
            alt="Store Counter"
        />
        <div className={styles.customer_slot} onDrop={handleDrop} onDragOver={(e) => {e.preventDefault()}}> </div>
        <div className={styles.device_row}>
            <div draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", "phone")}>
                <img
                src="/image/devices/phone.png"
                className={styles.device}
                />

            </div>

            <div draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", "laptop")}>
                <img
                src="/image/devices/laptop.png"
                className={styles.device}
                />

            </div>

            <div draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", "television")}>
                <img
                src="/image/devices/television.png"
                className={styles.device}
                />

            </div>
        </div>
    </div>
  );
}