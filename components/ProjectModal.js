import React, { useEffect } from "react";
import styles from "../styles/ProjectModal.module.css";

// components
import Carousel, { CarouselItem } from "./ProjectModalCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//font awesome icons
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

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
          <p className={styles.modalText}>{modalData.description}</p>
          <p className={styles.technologies}>
            Technologies:{" "}
            {modalData.technologies ? modalData.technologies.join(", ") : ""}.
          </p>
          <div className={styles.modalButtons}>
            <div className={styles.links}>
              {modalData.projectLink ? (
                <a
                  className={styles.projectLink}
                  href={modalData.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Site
                </a>
              ) : (
                <div />
              )}
              {modalData.gitHub ? (
                <a
                  className={styles.gitHub}
                  href={modalData.gitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              ) : (
                <div />
              )}
              {modalData.video ? (
                <a
                  className={styles.video}
                  href={modalData.video}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faVideo} />
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
