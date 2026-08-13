"use client";

import { useContext, useEffect, useRef } from "react";
import styles from "./project.large.heading.module.scss";
import { gsap } from "gsap";

type ProjectLargeHeadingProps = {
    label: string;
    hasDecsenders?: boolean;
};

function easeOutQuint(x: number): number {
return 1 - Math.pow(1 - x, 5);
}

function ProjectLargeHeading({ label, hasDecsenders = false }: ProjectLargeHeadingProps) {
    const textSpanRef = useRef<HTMLSpanElement>(null);

    const handleEnter = () => {
        window.dispatchEvent(
            new CustomEvent("cursor:update", {
                detail: {
                    show: true,
                    pointer: true,
                },
            })
        );
    };

    const handleLeave = () => {
        window.dispatchEvent(
            new CustomEvent("cursor:update", {
                detail: {
                    show: false,
                    pointer: false,
                },
            })
        );
    };


    useEffect(() => {
        if (textSpanRef.current) {
            gsap.to(textSpanRef.current, {
                transform: "translateY(0%)",
                duration: 1.2,
                // ease: "power2.out",
                ease: easeOutQuint,
            });
        }
    }, [textSpanRef.current]);

    return (
        <div
            className={
                [
                    styles.root,
                    hasDecsenders && styles.hasDecsenders
                ]
                    .filter(Boolean)
                    .join(" ")
            }
        >
            <span
                ref={textSpanRef}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    transform: "translate(0px, 110%)"
                }}
            >
                {label}
            </span>
        </div>
    );
}

export default ProjectLargeHeading;