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
