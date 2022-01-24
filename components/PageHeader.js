import React, { useEffect } from "react";

//styles
import styles from "../styles/PageHeader.module.css";

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
      <nav className={styles.navigation}>
        <div>Home</div>
        <div>About</div>
        <div>Projects</div>
        <div>Contact</div>
      </nav>
    </header>
  );
};

export default Header;
