
import ProjectInfoItem from "./ProjectInfoItem"
import styles from "./projects.info.module.scss"
import projects from "../../projects-data"
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
        {projects.map((project) => (
            <ProjectInfoItem key={project.id} projetsInfos={project} projectId={project.id} />
        ))}
    </div>);
})

export default ProjectsInfo;