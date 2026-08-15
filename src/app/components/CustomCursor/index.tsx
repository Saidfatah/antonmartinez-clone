"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./custom.cursor.module.scss";
import { CustomEventsMap, CustomEventsPayloads } from "@/app/types/events.types";

const size = 80;
function CustomCursor() {
    const ref = useRef<HTMLDivElement>(null);


    const [show, setShow] = useState(false);
    const [pointer, setPointer] = useState(false);

    useEffect(() => {
        const handleCursorUpdate = (
            event: Event
        ) => {
            const customEvent = event as CustomEvent<CustomEventsPayloads["cursor:update"]>;

            setShow(customEvent.detail.show);
            setPointer(customEvent.detail.pointer ?? false);
        };

        window.addEventListener(
            CustomEventsMap["cursor:update"],
            handleCursorUpdate
        );

        return () => {
            window.removeEventListener(
                CustomEventsMap["cursor:update"],
                handleCursorUpdate
            );
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!ref.current) return;

            const { clientX, clientY } = event;
            const correctedX = clientX - size / 2;
            const correctedY = clientY - size / 2;

            ref.current.style.transform = `
                translate3d(${correctedX}px, ${correctedY}px, 0)
            `;
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div 
            ref={ref} 
            className={[
                styles.root,
                show && styles.show,
                pointer && styles.showPointer
            ].filter(Boolean).join(' ')}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${size} ${size}`}
                className={styles.bg}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={size / 2}
                    className={styles.circle}
                />
            </svg>
        </div>
    );
}

export default CustomCursor;