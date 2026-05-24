"use client";
import { useEffect, useRef } from "react";
import styles from "../page.module.css";

export default function Home() {
  return (
    <div className={`${styles.page} ${styles.page_main_menu}`} style={{ backgroundImage: "url('/image/assets/store_bg.jpg')"}}>
    </div>
  );
}