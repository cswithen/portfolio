import React from "react";
import Link from "next/link";

//components
import Carousel, { CarouselItem } from "./ProjectModalCarousel";

//styles
import styles from "../styles/AboutHobby.module.css";

// Optional per-hobby call to action, driven by websiteData.json.
const HobbyLink = ({ link }) =>
  link ? (
    <Link href={link.href} className={styles.hobbyLink}>
      {link.label} &#8594;
    </Link>
  ) : null;

const AboutHobby = ({ hobbies }) => {
  const colors = ["#d9593d", "#f2af5c", "#6fa8bf", "#30588c"];

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
                        <CarouselItem
                          image={image}
                          key={`${image}-${index}`}
                          width={hobby.name === "Yoga" ? 2736 / 2 : undefined}
                          height={hobby.name === "Yoga" ? 3648 / 2 : undefined}
                        />
                      ))
                    : null}
                </Carousel>
              </div>
              <div className={styles.hobbyText}>
                <h3 className={styles.hobbyTitle}>{hobby.name}</h3>
                <hr
                  className={styles.break}
                  style={{ borderTop: `4px solid ${colors[index % 4]}` }}
                ></hr>
                <p>{hobby.description}</p>
                <HobbyLink link={hobby.link} />
              </div>
            </div>
          );
        } else {
          return (
            <div
              className={`${styles.hobbyContainer} ${styles.rightAlign}`}
              key={hobby.name}
            >
              <div className={styles.hobbyText}>
                <h3 className={styles.hobbyTitle}>{hobby.name}</h3>
                <hr
                  className={styles.break}
                  style={{ borderTop: `4px solid ${colors[index % 4]}` }}
                ></hr>
                <p>{hobby.description}</p>
                <HobbyLink link={hobby.link} />
              </div>
              <div className={styles.carousel}>
                <Carousel>
                  {hobby.images
                    ? hobby.images.map((image, index) => (
                        <CarouselItem
                          image={image}
                          key={`${image}-${index}`}
                          width={hobby.name === "Yoga" ? 2736 / 2 : undefined}
                          height={hobby.name === "Yoga" ? 3648 / 2 : undefined}
                        />
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
