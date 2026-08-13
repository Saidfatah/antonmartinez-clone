import ProjectLargeHeading from "../ProjectLargeHeading";
import styles from "./projects.headings.showcase.module.scss";

function ProjectsHeadingsShowcase() {
    return (<div className={styles.root}>
        <ProjectLargeHeading label="Wax Poetics" />
        <ProjectLargeHeading label="Nike" />
        <ProjectLargeHeading label="Spotify" hasDecsenders />
        <ProjectLargeHeading label="Cowboy" hasDecsenders />
        <ProjectLargeHeading label="Apple" hasDecsenders />
        <ProjectLargeHeading label="Bolt" />
        <ProjectLargeHeading label="29 Palms" />
        <ProjectLargeHeading label="We Work" />
    </div>);
}

export default ProjectsHeadingsShowcase;