import React, { useEffect, useRef } from "react";

//components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//font awesome icons
import {
  faPalette,
  faProjectDiagram,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

//styles
import styles from "../styles/AboutSkillCard.module.css";

const AboutSkillCard = ({ skill, index }) => {
  const icons = [faShieldAlt, faPalette, faProjectDiagram];
  const hexagonRef = useRef(null);

  useEffect(() => {
    const hexagon = hexagonRef.current;

    const handleMouseEnter = () => {
      hexagon.classList.add(styles.running);
    };

    const handleMouseLeave = () => {
      hexagon.addEventListener(
        "animationiteration",
        () => {
          hexagon.classList.remove(styles.running);
        },
        { once: true }
      );
    };

    hexagon.addEventListener("mouseenter", handleMouseEnter);
    hexagon.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hexagon.removeEventListener("mouseenter", handleMouseEnter);
      hexagon.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={styles.skillCard}>
      <div
        ref={hexagonRef}
        className={`${styles.hexagon} ${styles[skill.animation]}`}
        style={{ backgroundPosition: `${index * 50}%` }}
      >
        <div className={styles.faIcon}>
          <FontAwesomeIcon icon={icons[index]} />
        </div>
      </div>
      <h3>{skill.name}</h3>
      <div>{skill.tagline}</div>
    </div>
  );
};

export default AboutSkillCard;
