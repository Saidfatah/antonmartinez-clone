"use client";

import { useLayoutEffect, useRef } from "react";
import Navbar from "../Navbar";
import CustomCursor from "../CustomCursor";
import { useLayoutStore } from "@/app/store/layout.store";
import "@/app/globals.css";

type BaseLayoutProps = {
    children: React.ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
    const rootDiv = useRef<HTMLDivElement>(null);
    const setLayoutReady = useLayoutStore(
        (state) => state.setLayoutReady
    );

    useLayoutEffect(() => {
        if (!rootDiv.current) return;

        const container = rootDiv.current.querySelector(
            ".container"
        ) as HTMLElement | null;

        if (!container) return;

        const rect = container.getBoundingClientRect();
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

        setLayoutReady(true);
    }, [setLayoutReady]);

    return (

        <div ref={rootDiv} className="page">
            <main id="main">
                <CustomCursor />
                <Navbar />

                {children}
            </main>
        </div>
    );
}