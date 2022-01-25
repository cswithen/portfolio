import React from "react";

//styles
import styles from "../styles/AboutSkillCard.module.css";

const AboutSkillCard = ({ skill }) => {
  return (
    <div className={styles.skillCard}>
      <h3>{skill.name}</h3>
      <div>{skill.tagline}</div>
    </div>
  );
};

export default AboutSkillCard;
