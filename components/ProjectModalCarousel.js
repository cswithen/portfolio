import React, { useEffect, useState } from "react";

//components
import Image from "next/image";

//styles
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export const CarouselItem = ({ image, width, height }) => {
  return (
    <div>
      <Image
        src={`/${image}`}
        width={width ? width : 540 * 2}
        height={height ? height : 360 * 2}
        alt={`${image} picture`}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

const WrapperCarousel = ({ children }) => {
  return (
    <Carousel emulateTouch infiniteLoop showStatus={false} showThumbs={false}>
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child);
      })}
    </Carousel>
  );
};

export default WrapperCarousel;
