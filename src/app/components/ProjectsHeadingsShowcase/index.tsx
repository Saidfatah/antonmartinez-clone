"use client";

import { useCallback, useImperativeHandle, useRef, useState } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

import { works } from "@/app/projects-data";
import styles from "./projects.headings.showcase.module.scss";
import { worksAnimationsConfig } from "@/app/animations/work.animation.config";
import {
    CustomEventsMap,
    CustomEventsPayloads,
} from "@/app/types/events.types";

export type ProjectsHeadingsShowcaseRef = {
    revealTitles: () => void;
};

type Props = {
    ref: React.Ref<ProjectsHeadingsShowcaseRef>;
};

function ProjectsHeadingsShowcase({ ref }: Props) {
    const router = useRouter();

    const headingRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [canDispatchHideProjectInfoEvent, setCanDispatchHideProjectInfoEvent] =
        useState(true);

    const handleEnter = useCallback((projectId: string) => {
        window.dispatchEvent(
            new CustomEvent<CustomEventsPayloads["cursor:update"]>(
                CustomEventsMap["cursor:update"],
                {
                    detail: {
                        show: true,
                        pointer: true,
                    },
                }
            )
        );

        window.dispatchEvent(
            new CustomEvent<CustomEventsPayloads["projectinfo:show"]>(
                CustomEventsMap["projectinfo:show"],
                {
                    detail: {
                        projectId,
                    },
                }
            )
        );
    }, []);

    const handleLeave = useCallback(
        (projectId: string) => {
            if (!canDispatchHideProjectInfoEvent) return;

            window.dispatchEvent(
                new CustomEvent<CustomEventsPayloads["cursor:update"]>(
                    CustomEventsMap["cursor:update"],
                    {
                        detail: {
                            show: false,
                            pointer: false,
                        },
                    }
                )
            );

            window.dispatchEvent(
                new CustomEvent<CustomEventsPayloads["projectinfo:hide"]>(
                    CustomEventsMap["projectinfo:hide"],
                    {
                        detail: {
                            projectId,
                        },
                    }
                )
            );
        },
        [canDispatchHideProjectInfoEvent]
    );

    const handleClick = useCallback(
        (id: string, projectId: string) => {
            setCanDispatchHideProjectInfoEvent(false);

            window.dispatchEvent(
                new CustomEvent<CustomEventsPayloads["cursor:update"]>(
                    CustomEventsMap["cursor:update"],
                    {
                        detail: {
                            show: false,
                            pointer: false,
                        },
                    }
                )
            );

            window.dispatchEvent(
                new CustomEvent<CustomEventsPayloads["projectinfo:hide"]>(
                    CustomEventsMap["projectinfo:hide"],
                    {
                        detail: {
                            projectId,
                        },
                    }
                )
            );

            headingRefs.current.forEach((element) => {
                if (!element) return;

                gsap.to(
                    element,
                    worksAnimationsConfig.titleClickedHideAnimation
                );
            });

            setTimeout(() => {
                router.push(`/works/${id}`);
            }, worksAnimationsConfig.hideDuration * 1000);
        },
        [router]
    );

    useImperativeHandle(ref, () => ({
        revealTitles() {
            const { ...animation } =
                worksAnimationsConfig.titleRevealAnimation;


            headingRefs.current.forEach((element,index) => {
                if (!element) return;

                gsap.to(
                    element,
                    {
                        ...animation,
                        delay: 0.02 *index,
                    }
                );
            });
        },
    }));

    return (
        <div id="projects-headings-showcase" className={styles.root}>
            {works.map((work, index) => (
                <div
                    key={work.id}
                    onClick={() => handleClick(work.id, work.id)}
                    className={[
                        styles.heading,
                        work.hasDecsenders && styles.hasDecsenders,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    <span
                        ref={(element) => {
                            headingRefs.current[index] = element;
                        }}
                        onMouseEnter={() => handleEnter(work.id)}
                        onMouseLeave={() => handleLeave(work.id)}
                        style={
                            {
                                translate: "none",
                                rotate: "none",
                                scale: "none",
                                transform: "translate(0px, 110%)",
                                "--hide-duration": `${worksAnimationsConfig.hideDuration}s`,
                            } as React.CSSProperties
                        }
                    >
                        {work.headingTitle}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default ProjectsHeadingsShowcase;