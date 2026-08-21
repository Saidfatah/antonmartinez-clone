"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import Navbar, { NavbarRef } from "../Navbar";
import CustomCursor from "../CustomCursor";
import { useLayoutStore } from "@/app/store/layout.store";
import "@/app/globals.css";
import {
    pageLayoutAnimationConfig,
} from "@/app/animations/work.animation.config";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

type BaseLayoutProps = {
    children: React.ReactNode;
};

export default function BaseLayout({ children }: BaseLayoutProps) {
    const rootDiv = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<NavbarRef>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const pathname = usePathname();

    const {
        setLayoutReady,
        layoutReady,
        setPageRevealAnimationEnabled,
    } = useLayoutStore();

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

        const timeout = setTimeout(() => {
            setLayoutReady(true);
            setPageRevealAnimationEnabled(true);
            navbarRef.current?.revealLinks();
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    // Reset the container AFTER the new route has been committed.
    useLayoutEffect(() => {
        if (!contentRef.current) return;

        gsap.set(contentRef.current, {
            opacity: 1,
        });
    }, [pathname]);

    const preRouteChange = useCallback(
        (href: string) => {
            if (!contentRef.current) return;

            gsap.to(contentRef.current, {
                ...pageLayoutAnimationConfig.fadeout,
                onComplete: () => {
                    router.push(href);
                },
            });
        },
        [router]
    );

    return (
        <div ref={rootDiv} className="page">
            {!layoutReady && <div className="loaderOverlay" />}

            <main id="main">
                <CustomCursor />

                <Navbar
                    ref={navbarRef}
                    onNavigate={preRouteChange}
                />

                <div ref={contentRef}>
                    {children}
                </div>
            </main>
        </div>
    );
}