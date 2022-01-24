import React from "react";

//components
import AboutSkillCard from "./AboutSkillsCard";

const About = ({ about }) => {
  return (
    <div>
      <h1>About</h1>
      <div>{about.description}</div>
      {/* render Skill Cards */}
      <h2>Skills</h2>
      {about.skills.map((skill) => (
        <AboutSkillCard skill={skill} key={skill.name} />
      ))}
      {/* render Tools */}
      <h2>Tools</h2>
      <p>
        {about.tools.map((tool) => (
          <span key={tool.name}>
            {tool.name}
            {tool.additional ? ` ${tool.additional}` : ""},{" "}
          </span>
        ))}
      </p>
    </div>
  );
};

export default About;
