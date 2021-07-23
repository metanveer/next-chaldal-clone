import React, { useState } from "react";

import useInterval from "../../../hooks/useInterval";
import css from "./fade-carousel.module.css";

const FadeCarousel = ({ images }) => {
  const slideDuration = 3000;

  const [current, setCurrent] = useState(0);
  const [userHovering, setUserHovering] = useState(false);

  const length = images.length;
  const next = (current + 1) % length;

  useInterval(() => {
    if (!userHovering) {
      setCurrent(next);
    }
  }, slideDuration);

  return (
    <div
      onMouseEnter={() => setUserHovering(true)}
      onMouseLeave={() => setUserHovering(false)}
      className={css.container}
    >
      {images.map((image, index) => (
        <img
          key={index}
          className={`${css.image} ${
            index === current ? css.imageActive : null
          }`}
          src={image.BannerUrl}
        />
      ))}
    </div>
  );
};

export default FadeCarousel;
