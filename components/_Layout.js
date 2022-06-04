import React from "react";
import Head from "next/head";

// components
import Hero from "./Hero";
import Header from "./PageHeader";
import Footer from "./PageFooter";

//styles
import styles from "../styles/Layout.module.css";

const Layout = (props) => {
  return (
    <div className={styles.layoutContainer}>
      <Hero />
      <Head>
        <title>Cody Swithenbank | web developer</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="title" content="Cody Swithenbank | web developer" />
        <meta
          name="description"
          content="Cody Swithenbank is a Software Engineer, Yoga Instructor and Teaching Fellow located in California. Find Cody's recent projects, passions, socials and contact information here"
        />
        <link
          rel="image_src"
          href="https://cody-swithenbank.vercel.app/_next/image?url=%2FprofilePicture.jpg&w=828&q=75"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.navbuffer} />
        <Header />
        {props.children}
      </div>
      <Footer socials={props.data.socials} />
    </div>
  );
};

export default Layout;
