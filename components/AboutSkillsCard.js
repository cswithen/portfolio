import React from "react";

const AboutSkillCard = ({ skill }) => {
  return (
    <div>
      <div>{skill.name}</div>
      <div>{skill.tagline}</div>
    </div>
  );
};

export default AboutSkillCard;
