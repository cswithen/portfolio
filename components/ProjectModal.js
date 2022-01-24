import React, { useEffect } from "react";
import styles from "../styles/ProjectModal.module.css";

// components
import Carousel, { CarouselItem } from "./ProjectModalCarousel";

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
          <h4>{modalData.name}</h4>
          <p>{modalData.tagline}</p>
          <p>{modalData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
