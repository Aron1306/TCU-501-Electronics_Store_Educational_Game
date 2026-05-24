"use client";
import { useEffect, useRef } from "react";
import styles from "../page.module.css";

export default function Home() {
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
    </div>
  );
}