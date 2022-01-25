import React from "react";

//components
import Carousel, { CarouselItem } from "./ProjectModalCarousel";

//styles
import styles from "../styles/AboutHobby.module.css";

const AboutHobby = ({ hobbies }) => {
  return (
    <div>
      {hobbies.map((hobby, index) => {
        if (index % 2 === 0) {
          return (
            <div
              key={hobby.name}
              className={`${styles.hobbyContainer} ${styles.leftAlign}`}
            >
              <div className={styles.carousel}>
                <Carousel>
                  {hobby.images
                    ? hobby.images.map((image, index) => (
                        <CarouselItem image={image} key={`${image}-${index}`} />
                      ))
                    : null}
                </Carousel>
              </div>
              <div>
                <h3>{hobby.name}</h3>
                <p>{hobby.description}</p>
              </div>
            </div>
          );
        } else {
          return (
            <div className={`${styles.hobbyContainer} ${styles.rightAlign}`}>
              <div key={hobby.name}>
                <h3>{hobby.name}</h3>
                <p>{hobby.description}</p>
              </div>
              <div className={styles.carousel}>
                <Carousel>
                  {hobby.images
                    ? hobby.images.map((image, index) => (
                        <CarouselItem image={image} key={`${image}-${index}`} />
                      ))
                    : null}
                </Carousel>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default AboutHobby;
