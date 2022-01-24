import React, { useState } from "react";

//components
import ProjectGridCard from "./ProjectGridCard";
import ProjectModal from "../components/ProjectModal";

//styles
import styles from "../styles/ProjectGrid.module.css";

const ProjectGrid = ({ projects }) => {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({});

  return (
    <div className={styles.container}>
      <h1>Projects</h1>
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectGridCard
            key={project.name}
            project={project}
            modalShow={() => {
              setModalData(project);
              setShow(true);
            }}
          />
        ))}
      </div>
      <ProjectModal
        show={show}
        modalData={modalData}
        onClose={() => setShow(false)}
      />
    </div>
  );
};

export default ProjectGrid;
