import { workPageAnimationsConfig, workPageAnimationsIntialStates } from "@/app/animations/work.animation.config";
import { gsap } from "gsap";
import { useImperativeHandle, useRef } from "react";
import styles from "./project.title.module.scss";

export type ProjectTitleRef = {
    runRevealAnimation: () => void;
};

type Props = {
    subTitle: string;
    title: string;
    revealAnimationRef: React.Ref<ProjectTitleRef>;
}


function ProjectTitle({ revealAnimationRef, subTitle, title }: Props) {
    const titleSpanRef = useRef<HTMLSpanElement>(null);
    const subtitleSpanRef = useRef<HTMLSpanElement>(null);


    useImperativeHandle(revealAnimationRef, () => ({
        runRevealAnimation: () => {
            if (titleSpanRef.current) {
                gsap.to(titleSpanRef.current,
                    workPageAnimationsConfig.titleRevealAnimation);
            }
            if (subtitleSpanRef.current) {
                gsap.to(subtitleSpanRef.current,
                    workPageAnimationsConfig.subTitleRevealAnimation);
            }
        }
    }));


    return (
        <div className={styles.root}>
            <span
                ref={subtitleSpanRef}
                className={styles.subTitle}
                style={workPageAnimationsIntialStates.subTitle}
            >
                {subTitle}
            </span>

            <h1 className={styles.title}>
                <span
                    ref={titleSpanRef}
                    style={workPageAnimationsIntialStates.title}
                >
                    {title}
                </span>
            </h1>
        </div>
    );
}

export default ProjectTitle;