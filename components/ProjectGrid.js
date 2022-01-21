import React from "react";

//data
import data from "../lib/templateProjectData.json";

//components
import ProjectGridCard from "./ProjectGridCard";

//styles
import styles from "../styles/ProjectGrid.module.css";

const projectData = data.projects;

const ProjectGrid = () => {
  return (
    <div className={styles.container}>
      <h1>Work</h1>
      {projectData.map((project) => (
        <ProjectGridCard key={project.name} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid;
