import React from "react";

//components
import Image from "next/image";

//styles
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "../styles/Carousel.module.css";

export const CarouselItem = ({ image, ratio, focus }) => {
  // Per-carousel shape, so a portrait set doesn't force every carousel portrait.
  const slideStyle = {};
  if (ratio) slideStyle["--slide-ratio"] = ratio;
  if (focus) slideStyle["--slide-focus"] = focus;

  return (
    <div className={styles.slide} style={slideStyle}>
      <Image
        src={`/${image}`}
        alt={`${image} picture`}
        fill
        sizes="(max-width: 970px) 100vw, 620px"
        className={styles.slideImage}
      />
    </div>
  );
};

const WrapperCarousel = ({ children }) => {
  return (
    <Carousel emulateTouch infiniteLoop showStatus={false} showThumbs={false}>
      {React.Children.map(children, (child) => React.cloneElement(child))}
    </Carousel>
  );
};

export default WrapperCarousel;
