import React from "react";
import Image from "next/image";

//styles
import styles from "../styles/ProjectGridCard.module.css";

const ProjectGridCard = ({ project, modalShow }) => {
  return (
    <button
      className={styles.cardButton}
      onClick={modalShow}
      aria-label={`Open project details for ${project.name}`}
    >
      <div className={styles.cardContainer}>
        <Image
          className={styles.image}
          src={`/${project.coverImage}`}
          width={540 / 1.5}
          height={360 / 1.5}
          alt={`${project.name} title picture`}
        />
      </div>
    </button>
  );
};

export default ProjectGridCard;
