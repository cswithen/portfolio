import React from "react";

//components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//font awesome icons
import { faUser } from "@fortawesome/free-solid-svg-icons";

//styles
import styles from "../styles/AboutSkillCard.module.css";

const AboutSkillCard = ({ skill, index }) => {
  return (
    <div className={styles.skillCard}>
      <div
        className={`${styles.hexagon} ${styles[skill.animation]}`}
        style={{ backgroundPosition: `${index * 50}%` }}
      >
        <div className={styles.faIcon}>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
      <h3>{skill.name}</h3>
      <div>{skill.tagline}</div>
    </div>
  );
};

export default AboutSkillCard;
