import { useImperativeHandle } from "react";
import styles from "./navbar.module.scss";
import { gsap } from "gsap"
import { navbarAnimationCofig } from "@/app/animations/work.animation.config";

const menuItems = [
    { href: "/", label: "About", count: null },
    { href: "/works", label: "Works", count: 8 },
    { href: "/almost", label: "Almost", count: 15 },
];


export type NavbarRef = {
    revealLinks: () => void;
}

type Props = {
    ref: React.Ref<NavbarRef>
}

function Navbar({ ref }: Props) {


    useImperativeHandle(ref, () => ({
        revealLinks: () => {
            gsap.to(".gsap-item", navbarAnimationCofig.revealLinks);
        }
    }), [])

    return (<div className={styles.root}>
        <div className="row">
            <div className="column-8">
                <div className={styles.menuItems}>
                    {menuItems.map((item) => (
                        <a
                            href={item.href}
                            key={item.href}
                            className={[styles.item, "gsap-item"].join(' ')}
                            style={{
                                translate: "none",
                                rotate: "none",
                                scale: "none",
                                transform: "translate(0px, -200%)",
                                opacity: 0
                            }}
                        >
                            <span>{item.label} {item.count && <small>{item.count}</small>} </span>
                        </a>
                    ))}
                </div>
            </div>

            {/* // logo */}
            <div className="column-4">
                <a
                    href="/"
                    className={[styles.logo, "gsap-item"].join(" ")}
                    style={{
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transform: "translate(0px, -200%)",
                        opacity: 0
                    }}

                >
                    <h1 className={styles.normal}>
                        Anto
                        <span className={styles.right}>
                            grama<small>®</small>
                        </span>
                    </h1>

                    <h1 className={styles.hover}>
                        <span className={styles.left}>Anto</span>
                        <span className={styles.right}>n Martinez</span>
                    </h1>
                </a>
            </div>
        </div>
    </div>);
}

export default Navbar;