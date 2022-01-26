import React from "react";

//components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//font awesome icons
import {
  faGithub,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

//styles
import styles from "../styles/Footer.module.css";

const Footer = ({ socials }) => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.socialContainer}>
        {socials.map((social, index) => {
          let icon = [faGithub, faLinkedinIn, faInstagram];

          return (
            <a key={social.name} href={social.link}>
              <div className={styles.socialCard}>
                <FontAwesomeIcon icon={icon[index]} />
              </div>
            </a>
          );
        })}
      </div>
      <div className={styles.signature}>cody swithenbank</div>
    </div>
  );
};

export default Footer;
