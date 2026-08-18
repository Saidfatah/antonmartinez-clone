"use client";

import { useRef } from "react";
import { useVirtualScroll } from "../hooks/useVirtualScroll";
import { CustomEventsMap, CustomEventsPayloads } from "../types/events.types";
import ProjectsHeadingsShowcase from "../components/ProjectsHeadingsShowcase";
import ProjectsInfo from "../components/ProjectsInfo";
import { useLayoutStore } from "../store/layout.store";



export default function Pages() {
    const { layoutReady } = useLayoutStore();
    
    const scrollAbleContainer = useRef<HTMLDivElement>(null);
    const scrollPointerRef = useRef<HTMLDivElement>(null);
    const projectsInfoContainerRef = useRef<{ updateTransofmrPosition: (transform: string) => void }>(null);

    useVirtualScroll(scrollAbleContainer, {
        scrollPointerRef,
        onScrollUpdate: (scrollY: number, maxScroll: number) => {
            if (projectsInfoContainerRef.current && scrollAbleContainer.current) {
                // const projectsHeadings = document.getElementById("projects-headings-showcase");
                const projectsHeadingsPadding = 210;

                const footerHeight = projectsHeadingsPadding;
                const scrollPercentage = scrollY / maxScroll;

                const offset = scrollPercentage * footerHeight * -1;

                projectsInfoContainerRef.current.updateTransofmrPosition(`translateY(${offset}px)`);
            }
        },
        onScrollStart: () => {
            window.dispatchEvent(
                new CustomEvent<CustomEventsPayloads["projectinfo:hide"]>(CustomEventsMap["projectinfo:hide"], {
                    detail: {
                        projectId: "",
                    },
                })
            );
            window.dispatchEvent(
                new CustomEvent<CustomEventsPayloads["cursor:update"]>(CustomEventsMap["cursor:update"], {
                    detail: {
                        show: false,
                        pointer: false,
                    },
                })
            );
        }
    });

    return (
        <>
            <div
                ref={scrollPointerRef}
                id="scroll-pointer"
            />

            <div>
                <div className="page">
                    <div
                        ref={scrollAbleContainer}
                        className={`container ${layoutReady ? "row" : ""} flex-end`}
                    >
                        <div className="column-8">
                            <ProjectsHeadingsShowcase />
                        </div>
                    </div>
                    <ProjectsInfo ref={projectsInfoContainerRef} />
                </div>
            </div>
        </>
    );
}