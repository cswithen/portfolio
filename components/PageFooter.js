import React from "react";

//styles
import styles from "../styles/Footer.module.css";

const Footer = ({ socials }) => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.socialContainer}>
        {socials.map((social) => (
          <div key={social.name} className={styles.socialCard}>
            <a href={social.link}>{social.name}</a>
          </div>
        ))}
      </div>
      <div className={styles.signature}>cody swithenbank</div>
    </div>
  );
};

export default Footer;
