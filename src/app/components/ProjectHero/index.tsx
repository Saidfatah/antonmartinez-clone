
import { useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import styles from "./project.hero.module.scss";
import { workPageAnimationsConfig, workPageAnimationsIntialStates } from "@/app/animations/work.animation.config";
import { gsap } from "gsap"

export type ProjectHeroRef = {
    revealHeroImage: () => void;
};

type Props = {
    ref: React.Ref<ProjectHeroRef>;
    headerImage: string;
    headerImageIntersicSize: { width: number; height: number };
    title: string;
};

function Projecthero({ ref, headerImage, headerImageIntersicSize, title }: Props) {
    const heroImgRef = useRef<HTMLDivElement>(null);

    const [imageLoaded, setImageLoaded] = useState(false);

    useImperativeHandle(ref, () => (
        {
            revealHeroImage: () => {
                gsap.to(heroImgRef.current, workPageAnimationsConfig.heroImageRevealAnimation)
            }
        }
    ), [heroImgRef])

    return (<figure
        className={[
            "responsiveImage",
            "bg",
            styles.headerImage,
            imageLoaded ? "loaded" : ""
        ].join(" ")}
    >
        <div
            className="ratio"
            style={{
                paddingBottom: `${(headerImageIntersicSize.height / headerImageIntersicSize.width) * 100}%`,
                backgroundImage: `url(undefined)`,
                opacity: 1,
            }}
        />
        
        <div
            className={styles.heroImgContainer}
            ref={heroImgRef}
            style={ workPageAnimationsIntialStates.heroImageRevealAnimation}
        >
            <img
                src={headerImage}
                alt={title}
                onLoad={() => setImageLoaded(true)}

            />
        </div>
    </figure>);
}

export default Projecthero;