import React, { useState } from "react";

//components
import Image from "next/image";

//styles
import styles from "../styles/ProjectModalCarousel.module.css";

export const CarouselItem = ({ image, width }) => {
  return (
    <div className={styles.carouselItem}>
      <Image
        src={`/${image}`}
        width={540}
        height={360}
        alt={`${image} picture`}
      />
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.inner}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className={styles.indicators}>
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          &#10094;
        </button>
        <button
          className={styles.right}
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
