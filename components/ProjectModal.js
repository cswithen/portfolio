import React, { useEffect } from "react";
import styles from "../styles/ProjectModal.module.css";

// components
import Carousel, { CarouselItem } from "./ProjectModalCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//font awesome icons
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const ProjectModal = ({ show, onClose, modalData }) => {
  const closeModal = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeModal);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeModal);
    };
  });

  return (
    <div
      className={`${styles.modal} ${show ? styles.show : ""}`}
      onClick={onClose}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <Carousel className={styles.modalBody}>
          {modalData.images
            ? modalData.images.map((image, index) => (
                <CarouselItem image={image} key={index} />
              ))
            : null}
        </Carousel>
        <div className={styles.modalFooter}>
          <p className={styles.modalTagline}>{modalData.tagline}</p>
          <h3 className={styles.modalTitle}>{modalData.name}</h3>
          <p>{modalData.description}</p>
          <p className={styles.technologies}>
            Technologies:{" "}
            {modalData.technologies ? modalData.technologies.join(", ") : ""}.
          </p>
          <div className={styles.modalButtons}>
            <div className={styles.links}>
              {modalData.projectLink ? (
                <a className={styles.projectLink} href={modalData.projectLink}>
                  Visit Site
                </a>
              ) : (
                <div />
              )}
              {modalData.gitHub ? (
                <a className={styles.gitHub} href={modalData.gitHub}>
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              ) : (
                <div />
              )}
            </div>
            <button onClick={onClose} className={styles.modalButton}>
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
