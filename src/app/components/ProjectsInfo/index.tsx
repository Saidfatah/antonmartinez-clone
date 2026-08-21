
import ProjectInfoItem from "./ProjectInfoItem"
import styles from "./projects.info.module.scss"
import {works} from "../../projects-data"
import { forwardRef, useImperativeHandle, useRef } from "react";
 
type ProjectsInfoRef = {
    updateTransofmrPosition: (transform: string) => void;
}
const ProjectsInfo = forwardRef<ProjectsInfoRef, {}>((_, ref) => {
    const rootRef = useRef<HTMLDivElement>(null);
    
    useImperativeHandle(ref, () => ({
        // Add any methods or properties you want to expose
        updateTransofmrPosition: (transform: string) => {
            if (rootRef.current && transform) {
                rootRef.current.style.transform = transform;
            }
        }
    }));
    
    return (<div ref={rootRef} className={styles.root}>
        {works.map((work) => (
            <ProjectInfoItem key={work.id} projetsInfos={work} projectId={work.id} />
        ))}
    </div>);
})

export default ProjectsInfo;