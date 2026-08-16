import projects from "@/app/projects-data";
import ProjectLargeHeading from "../ProjectLargeHeading";
import styles from "./projects.headings.showcase.module.scss";

function ProjectsHeadingsShowcase() {
    return (<div id="projects-headings-showcase" className={styles.root}>
        {projects.map((project) => (
            <ProjectLargeHeading
                key={project.id}
                projectId={project.id}
                label={project.headingTitle}
                hasDecsenders={project.hasDecsenders}
            />
        ))}
    </div>);
}

export default ProjectsHeadingsShowcase;