"use client";

import { useLayoutEffect, useRef, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import ProjectsHeadingsShowcase from "./components/ProjectsHeadingsShowcase";
import ProjectsInfo from "./components/ProjectsInfo";
import { useVirtualScroll } from "./hooks/useVirtualScroll";
import { CustomEventsMap, CustomEventsPayloads } from "./types/events.types";

const Layout = ({ children }: { children: (layoutReady: boolean) => React.ReactNode }) => {
  const rootDiv = useRef<HTMLDivElement>(null);
  const [layoutReady, setLayoutReady] = useState(false);


  useLayoutEffect(() => {
    if (!rootDiv.current) return;

    const container = rootDiv.current.querySelector(
      ".container"
    ) as HTMLElement | null;

    if (!container) return;

    const rect = container.getBoundingClientRect();

    console.log("INITIAL RECT", {
      left: rect.left,
      width: rect.width,
    });

    const margin = rect.left;

    document.documentElement.style.setProperty(
      "--container-margin",
      `${margin}px`
    );

    document.documentElement.style.setProperty(
      "--container-width",
      `${rect.width}px`
    );

    document.documentElement.style.setProperty(
      "--column",
      `${(rect.width + margin) / 12}px`
    );

    // Now that the container has been measured,
    // allow .row to participate in the layout.
    setLayoutReady(true);
  }, []);

  return (
    <div ref={rootDiv} className="page">
      {children(layoutReady)}
    </div>
  );
};

export default function Home() {
  const scrollAbleContainer = useRef<HTMLDivElement>(null);
  const scrollPointerRef = useRef<HTMLDivElement>(null);

  useVirtualScroll(scrollAbleContainer, {
    scrollPointerRef, onScrollStart: () => {
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
    <Layout>
      {(layoutReady: boolean) => (
        <main id="main">
          <CustomCursor />
          <div
            ref={scrollPointerRef}
            id="scroll-pointer"
          />

          <div
            ref={scrollAbleContainer}
            className={`container ${layoutReady ? "row" : ""} flex-end`}
          >
            <div className="column-8">
              <ProjectsHeadingsShowcase />
            </div>
          </div>
          <ProjectsInfo />
        </main>
      )}
    </Layout>
  );
}