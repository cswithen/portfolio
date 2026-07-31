import React, { useEffect, useRef } from "react";

//components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//font awesome icons
import {
  faPalette,
  faDiagramProject,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

//styles
import styles from "../styles/AboutSkillCard.module.css";

// websiteData.json is the source of truth: each skill's "fa-name" selects its icon.
const iconsByName = {
  faShieldHalved,
  faPalette,
  faDiagramProject,
};

const AboutSkillCard = ({ skill, index }) => {
  const icon = iconsByName[skill["fa-name"]];
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
          {icon ? <FontAwesomeIcon icon={icon} /> : null}
        </div>
      </div>
      <h3>{skill.name}</h3>
      <div>{skill.tagline}</div>
    </div>
  );
};

export default AboutSkillCard;
