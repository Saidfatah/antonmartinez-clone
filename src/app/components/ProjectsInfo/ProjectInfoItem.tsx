import { useEffect, useState } from "react"
import MaskedText from "../MaskedText"
import styles from "./project.info.item.module.scss"
import { CustomEventsMap, CustomEventsPayloads } from "@/app/types/events.types"

type Props = {
    projetsInfos: {
        id: string,
        title: string,
        client: string,
        year: string
    },
    projectId: string
}
function ProjectInfoItem({ projetsInfos, projectId }: Props) {

    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        const handleProjectInfoShow = (
            event: Event
        ) => {
            const customEvent = event as CustomEvent<CustomEventsPayloads["projectinfo:show"]>;

            if (customEvent.detail.projectId === projectId) {
                setShowInfo(true);
            }
        };

        window.addEventListener(
            CustomEventsMap["projectinfo:show"],
            handleProjectInfoShow
        );

        return () => {
            window.removeEventListener(
                CustomEventsMap["projectinfo:show"],
                handleProjectInfoShow
            );
        };
    }, []);

    useEffect(() => {
        const handleProjectInfoHide = (
            event: Event
        ) => {
            const customEvent = event as CustomEvent<{ projectId: string }>;
            if (customEvent.detail.projectId === projectId) {
                setShowInfo(false);
            }
        };

        window.addEventListener(
            "projectinfo:hide",
            handleProjectInfoHide
        );

        return () => {
            window.removeEventListener(
                "projectinfo:hide",
                handleProjectInfoHide
            );
        };
    }, []);

    return (<div className={styles.root}>
        <MaskedText show={showInfo} text={"Project"} />
        <MaskedText show={showInfo} text={projetsInfos.title} />
        <MaskedText show={showInfo} text={projetsInfos.client} />
        <MaskedText show={showInfo} text={projetsInfos.year} />
    </div>);
}

export default ProjectInfoItem;