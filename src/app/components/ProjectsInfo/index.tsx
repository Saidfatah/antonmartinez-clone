
import ProjectInfoItem from "./ProjectInfoItem"
import styles from "./projects.info.module.scss"
import projects from "../../projects-data"
 
function ProjectsInfo() {
    return (<div className={styles.root}>
        {projects.map((project) => (
            <ProjectInfoItem key={project.id} projetsInfos={project} projectId={project.id} />
        ))}
    </div>);
}

export default ProjectsInfo;