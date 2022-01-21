import Image from "next/image";
import styles from "../styles/Home.module.css";

//components
import Layout from "../components/_Layout";
import ProjectGrid from "../components/ProjectGrid";

export default function Home() {
  return (
    <Layout>
      <ProjectGrid />
      <div>some content here</div>
    </Layout>
  );
}
