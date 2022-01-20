import Image from "next/image";
import styles from "../styles/Home.module.css";

//components
import Layout from "../components/_Layout";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}></div>
    </Layout>
  );
}
