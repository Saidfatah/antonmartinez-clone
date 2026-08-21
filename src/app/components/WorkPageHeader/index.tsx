import { Work } from "@/app/types/entities.types";
import styles from "./work.page.header.module.scss";
import { useEffect, useRef, useState } from "react";
import InfoItems from "../InfoItems";
import ProjectTitle, { ProjectTitleRef } from "../ProjectTitle";
import { useLayoutStore } from "@/app/store/layout.store";
import { gsap } from "gsap";
import { workPageAnimationsConfig, workPageAnimationsIntialStates } from "@/app/animations/work.animation.config";
import Projecthero, { ProjectHeroRef } from "../ProjectHero";

type props = Work

function WorkPageHeader({ headerImage, workinfo, subTitle, headerImageIntersicSize, hasDecsenders, id, title }: props) {
    const { pageRevealAnimationEnabled } = useLayoutStore()


    const ProjectTitleRef = useRef<ProjectTitleRef>(null);
    const projectHeroRef = useRef<ProjectHeroRef>(null);
    const heroInfoRef = useRef<HTMLDivElement>(null);

    const headerInfoItems = [
        {
            title: "Agency",
            infosItems: workinfo.agency
        },
        {
            title: "Role",
            infosItems: workinfo.role
        }

    ]

    useEffect(() => {
        if (pageRevealAnimationEnabled) {
            ProjectTitleRef.current?.runRevealAnimation()
            projectHeroRef.current?.revealHeroImage()
            gsap.to(heroInfoRef.current, workPageAnimationsConfig.heroInfosRevealAnimation)
        }
    }, [pageRevealAnimationEnabled, projectHeroRef, heroInfoRef, ProjectTitleRef, projectHeroRef]);



    return (<header className={styles.root}>


        <div className={
            [
                "row",
                styles.headerTop
            ].join(" ")
        }>
            <div className="column-8">
                <ProjectTitle
                    revealAnimationRef={ProjectTitleRef}
                    {...{
                        subTitle: subTitle,
                        title: title
                    }}
                />
            </div>

            <div
                ref={heroInfoRef}
                style={workPageAnimationsIntialStates.heroInfos}
                className="column-4"
            >
                <InfoItems
                    infoItems={headerInfoItems}
                    className={styles.headerInfoItems}
                />
            </div>
        </div>

        <div className="container">
            <Projecthero
                ref={projectHeroRef}
                headerImage={headerImage}
                headerImageIntersicSize={headerImageIntersicSize}
                title={title}
            />
        </div>
    </header>);

}

export default WorkPageHeader;