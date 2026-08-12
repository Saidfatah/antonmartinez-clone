"use client";

import styles from "./project.large.heading.module.scss";

type ProjectLargeHeadingProps = {
    label: string;
};

function ProjectLargeHeading({ label }: ProjectLargeHeadingProps) {
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

    return (
        <div
            className={styles.root}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {label}
        </div>
    );
}

export default ProjectLargeHeading;