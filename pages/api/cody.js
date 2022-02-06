// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import data from "../../lib/websiteData.json";

const softSkills = data.about.skills.map((skill) => {
  return {
    name: skill.name,
    tagline: skill.tagline,
  };
});

const technicalSkills = {
  languages: data.about.languages,
  frontEnd: data.about.frontEnd,
  backEnd: data.about.backEnd,
  design: data.about.design,
};

const links = data.socials.map((social) => {
  return {
    name: social.name,
    link: social.link,
  };
});

const hobbies = data.about.hobbies.map((hobby) => {
  return {
    name: hobby.name,
    description: hobby.description,
  };
});

const projects = data.projects.map((project) => {
  return {
    name: project.name,
    tagline: project.tagline,
    description: project.description,
    github: project.gitHub,
    projectLink: project.projectLink,
    videoLink: project.video,
    technologies: project.technologies,
  };
});

export default function handler(req, res) {
  res.status(200).json({
    name: "Cody Swithenbank",
    description: data.about.description,
    softSkills: softSkills,
    technicalSkills: technicalSkills,
    links: links,
    hobbies: hobbies,
    projects: projects,
  });
}
