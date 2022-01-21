import React from "react";

//styles
import styles from "../styles/ProjectGridCard.module.css";

const ProjectGridCard = ({ project }) => {
  return (
    <div className={styles.cardContainer}>
      <h2>{project.name}</h2>
      <p>{project.tagline}</p>
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectGridCard;
