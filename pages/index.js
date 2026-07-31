import styles from "../styles/Home.module.css";

//components
import Layout from "../components/_Layout";
import ProjectGrid from "../components/ProjectGrid";
import About from "../components/About";

//data
import data from "../lib/websiteData.json";
import { showProjects } from "../lib/siteConfig";

export default function Home() {
  return (
    <Layout data={data}>
      {showProjects && <ProjectGrid projects={data.projects} />}
      <About about={data.about} />
    </Layout>
  );
}
