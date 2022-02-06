import React from "react";

//components
import AboutSkillCard from "./AboutSkillsCard";
import Image from "next/image";

//styles
import styles from "../styles/About.module.css";
import AboutHobby from "./AboutHobby";

const About = ({ about }) => {
  return (
    <div className={styles.aboutContainer}>
      <a name="about" />
      <h1 className={styles.aboutTitle}>About</h1>
      {/* render Skill Cards */}
      <div className={styles.skillContainer}>
        {about.skills.map((skill, index) => (
          <AboutSkillCard skill={skill} index={index} key={skill.name} />
        ))}
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.profileDescription}>
          <h2 className={styles.name}>Cody Swithenbank</h2>
          <p>{about.description}</p>
        </div>
        <div>
          <Image
            src={"/profilePicture.jpg"}
            width={2304 / 3}
            height={1536 / 3}
            alt="profile picture"
            className={styles.profilePicture}
          />
        </div>
      </div>
      {/* render Hobbies */}
      <h2 className={styles.hobbyTitle}>when I am not coding</h2>
      <AboutHobby hobbies={about.hobbies} />
      <h3 className={styles.meetMe}>
        <a
          href="https://calendly.com/cody-swithenbank/30min"
          target="_blank"
          rel="noopener noreferrer"
        >
          Let's <span className={styles.meHighlight}>Meet!</span>
        </a>
      </h3>
    </div>
  );
};

export default About;
