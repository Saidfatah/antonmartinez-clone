"use client";

import Link from "next/link";
import { useImperativeHandle } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

import styles from "./navbar.module.scss";

import {
    navbarAnimationCofig,
    navBarAnimationsIntialStates,
    navbarDelaysMap,
} from "@/app/animations/work.animation.config";

const menuItems = [
    { href: "/", label: "About", count: null },
    { href: "/works", label: "Works", count: 8 },
    { href: "/almost", label: "Almost", count: 15 },
];

export type NavbarRef = {
    revealLinks: () => void;
};

type Props = {
    onNavigate?: (href: string) => void;
    ref: React.Ref<NavbarRef>;
};

function Navbar({ ref, onNavigate }: Props) {
    const pathname = usePathname();

    const isWorksPage = pathname === "/works";

    useImperativeHandle(ref, () => ({
        revealLinks: () => {
            gsap.to(".gsap-item", {
                ...navbarAnimationCofig.revealLinks,
                delay: navbarDelaysMap[
                    isWorksPage ? "works" : "other"
                ],
            });
        },
    }), [isWorksPage]);

    return (
        <div className={styles.root}>
            <div className="row">
                <div className="column-8">
                    <div className={styles.menuItems}>
                        {menuItems.map((item) => (
                            <a
                                onClick={(event) => {
                                    event.preventDefault();
                                    onNavigate?.(item.href);
                                }}
                                key={item.href}
                                className={[styles.item, "gsap-item"].join(" ")}
                                style={navBarAnimationsIntialStates.links}
                            >
                                <span>
                                    {item.label}{" "}
                                    {item.count && <small>{item.count}</small>}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="column-4">
                    <Link
                        href="/"
                        className={[styles.logo, "gsap-item"].join(" ")}
                        style={navBarAnimationsIntialStates.links}
                    >
                        <h1 className={styles.normal}>
                            Anto
                            <span className={styles.right}>
                                grama<small>®</small>
                            </span>
                        </h1>

                        <h1 className={styles.hover}>
                            <span className={styles.left}>Anto</span>
                            <span className={styles.right}>
                                n Martinez
                            </span>
                        </h1>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;