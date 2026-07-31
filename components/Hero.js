import React from "react";

//components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeroPts from "./HeroPts";

//font awesome icons
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// styles
import styles from "../styles/Hero.module.css";

//config
import { showProjects } from "../lib/siteConfig";

const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <a name="home" />
      <HeroPts name="pts" background="transparent" style={{ height: "100%" }} />
      <h1 className={styles.heroText}>
        Hello, my name is{" "}
        <span className={styles.nameHighlight}>Cody Swithenbank</span>. <br />
        And I am a full-stack developer. <br />
        A human one. <br />
        <br />
        <a
          href={showProjects ? "#projects" : "#about"}
          className={styles.button}
        >
          Take a look{" "}
          <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
        </a>
      </h1>
    </div>
  );
};

export default Hero;
