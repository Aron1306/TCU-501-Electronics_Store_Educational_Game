"use client";
import { useEffect, useRef } from "react";
import styles from "../page.module.css";
import { display, display_text } from "../Dialogue";

export default function Home() {

    /*Handle items being dropped in the designed area*/
    const handleDrop = (e) => {
        e.preventDefault();
        const device = e.dataTransfer.getData("text/plain");
    };

    const RandomDialogue = () => {
        /* Devices array */
        let devices_array = [null, null, null];
   
        /* Store random decisions */
        let customer;
        let audio_track;
        let dialogue_selection;
        let correct_device_pos;
        let incorrect_device;

        /* Decide the next dialogue */
        dialogue_selection = display.level1.dialogue[Math.floor(Math.random() * display.level1.dialogue.length)];

        /* Decide the sex of the next customer */
        const random_customer_sex = Math.floor(Math.random() * 2);

        /* Decide the next customer and their audio track */
        if (random_customer_sex === 0){
            customer = display.all_levels.male_customers[Math.floor(Math.random() * display.all_levels.male_customers.length)];
            audio_track = dialogue_selection.audio_male[Math.floor(Math.random() * dialogue_selection.audio_male.length)];
        } else {
            customer = display.all_levels.female_customers[Math.floor(Math.random() * display.all_levels.female_customers.length)];
            audio_track = dialogue_selection.audio_female[Math.floor(Math.random() * dialogue_selection.audio_female.length)];
        }

        /* Decide the position of the correct device in the devices array */
        correct_device_pos = Math.floor(Math.random() * devices_array.length);
        devices_array[correct_device_pos] = dialogue_selection.image;

        /* Fill the device array with random devices, but assure there is always a correct one */
        for (let pos = 0; pos < devices_array.length; pos++){
            if (pos != correct_device_pos){
                /* Avoid inserting the same image twice*/
                do {
                    incorrect_device = display.all_levels.devices[Math.floor(Math.random() * display.all_levels.devices.length)];
                } while (devices_array.includes(incorrect_device));

                devices_array[pos] = incorrect_device;
            }
        }

        return {customer, audio_track, dialogue_selection, devices_array};
    };
  return (
    <div className={`${styles.page} ${styles.page_main_menu}`} style={{ backgroundImage: "url('/image/assets/store_bg.jpg')"}}>
        <img
            src="/image/customers/woman1.png"
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