import styles from "../styles/Home.module.css";

//components
import Layout from "../components/_Layout";
import ProjectGrid from "../components/ProjectGrid";
import About from "../components/About";

//data
import data from "../lib/templateProjectData.json";

export default function Home() {
  return (
    <Layout data={data}>
      <ProjectGrid projects={data.projects} />
      <About about={data.about} />
    </Layout>
  );
}
