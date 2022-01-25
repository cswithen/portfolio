import React from "react";

//components
import AboutSkillCard from "./AboutSkillsCard";
import Image from "next/image";

//styles
import styles from "../styles/About.module.css";
import AboutHobby from "./AboutHobby";

const About = ({ about }) => {
  return (
    <div>
      <h1 className={styles.aboutTitle}>About</h1>
      {/* render Skill Cards */}
      <div className={styles.skillContainer}>
        {about.skills.map((skill) => (
          <AboutSkillCard skill={skill} key={skill.name} />
        ))}
      </div>
      <div className={styles.descriptionContainer}>
        <div>{about.description}</div>
        <Image
          src={"/profilePicture.jpg"}
          width={2304 / 3}
          height={1536 / 3}
          alt="profile picture"
        />
      </div>
      {/* render Hobbies */}
      <h2>Hobbies</h2>
      <AboutHobby hobbies={about.hobbies} />
    </div>
  );
};

export default About;
