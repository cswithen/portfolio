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
      <h2 className={styles.aboutTitle}>About</h2>
      {/* render Skill Cards */}
      <div className={styles.skillContainer}>
        {about.skills.map((skill, index) => (
          <AboutSkillCard skill={skill} index={index} key={skill.name} />
        ))}
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.profileDescription}>
          <h3 className={styles.name}>Cody Swithenbank</h3>
          {[].concat(about.description).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.profilePictureContainer}>
          <Image
            src={"/profilePicture.jpg"}
            width={2736 / 4}
            height={3648 / 4}
            alt="profile picture"
            className={styles.profilePicture}
          />
        </div>
      </div>
      {/* render Hobbies */}
      {/* <h3 className={styles.hobbyTitle}>when I am not coding</h3> */}
      <AboutHobby hobbies={about.hobbies} />
      {/* <h3 className={styles.meetMe}>
        <a
          href="https://calendly.com/cody-swithenbank/30min"
          target="_blank"
          rel="noopener noreferrer"
        >
          Let&apos;s <span className={styles.meHighlight}>Meet!</span>
        </a>
      </h3> */}
    </div>
  );
};

export default About;
