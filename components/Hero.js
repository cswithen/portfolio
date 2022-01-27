import React from "react";

//components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeroPts from "./HeroPts";

//font awesome icons
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// styles
import styles from "../styles/Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <a name="home" />
      <HeroPts name="pts" background="transparent" style={{ height: "100%" }} />
      <div className={styles.heroText}>
        Hello, my name is{" "}
        <span className={styles.nameHighlight}>Cody Swithenbank</span>. <br />
        And I am a full-stack web developer. <br />
        <br />
        <a href="#projects" className={styles.button}>
          Check my work{" "}
          <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
        </a>
      </div>
    </div>
  );
};

export default Hero;
