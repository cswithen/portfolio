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
    <div>
      <Hero />
      <Head>
        <title>Cody Swithenbank | web developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Header />
        {props.children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
