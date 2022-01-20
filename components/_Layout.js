import React from "react";
import Head from "next/head";

// components
import Header from "./PageHeader";
import Footer from "./PageFooter";

const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>Cody Swithenbank | web developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
