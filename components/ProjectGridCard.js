import React from "react";
import Image from "next/image";

//styles
import styles from "../styles/ProjectGridCard.module.css";

const ProjectGridCard = ({ project, modalShow }) => {
  return (
    <div onClick={modalShow}>
      <div className={styles.cardContainer}>
        <Image
          src={`/${project.images[0]}`}
          width={540 / 1.5}
          height={360 / 1.5}
          alt={`${project.name} title picture`}
        />
      </div>
    </div>
  );
};

export default ProjectGridCard;
