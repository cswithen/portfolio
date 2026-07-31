import React, { useEffect } from "react";
import Link from "next/link";

//styles
import styles from "../styles/PageHeader.module.css";

//config
import { showProjects } from "../lib/siteConfig";

const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > window.innerHeight) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  let navbarClasses = [styles.navbar];
  if (scrolled) {
    navbarClasses.push(styles.scrolled);
  }

  return (
    <header className={navbarClasses.join(" ")}>
      <div className={styles.navContent}>
        <div></div>
        <nav className={styles.navigation}>
          <div>
            <a href="#home">Home</a>
          </div>
          {showProjects && (
            <div>
              <a href="#projects">Projects</a>
            </div>
          )}
          <div>
            <a href="#about">About</a>
          </div>
          <div>
            <Link href="/codyscookbook">Cookbook</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
