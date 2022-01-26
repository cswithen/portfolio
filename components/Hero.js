import React from "react";

// styles
import styles from "../styles/Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <a name="home" />
      <div className={styles.heroText}>
        Hello, my name is{" "}
        <span className={styles.nameHighlight}>Cody Swithenbank</span>. <br />
        And I am a full-stack web developer.
      </div>
      <div className={styles.canvas}></div>
    </div>
  );
};

export default Hero;
