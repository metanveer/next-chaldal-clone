import { useState } from "react";
import css from "./ImgCarousel.module.css";
import useInterval from "../../../hooks/useInterval";

const ImgCarousel = ({ images }) => {
  const slideDuration = 4000;

  const [current, setCurrent] = useState(0);
  const [userHovering, setUserHovering] = useState(false);

  const length = images.length;

  const next = (current + 1) % length;

  useInterval(() => {
    if (!userHovering) {
      setCurrent(next);
    }
  }, slideDuration);

  function getSlideStyle(current) {
    return { width: `${length * 100}%`, left: `${current * -100}%` };
  }

  const handleSelectSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div
      onMouseEnter={() => setUserHovering(true)}
      onMouseLeave={() => setUserHovering(false)}
      className={css.carousel}
    >
      <div className={css.carouselControl}>
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleSelectSlide(index)}
            className={current === index ? css.activeDot : css.dot}
          ></div>
        ))}
      </div>
      <div className={css.allSlides} style={getSlideStyle(current)}>
        {images.map((image, index) => (
          <img
            className={css.slide}
            key={index}
            src={image.image}
            alt="how to order on chaldal"
          />
        ))}
      </div>
    </div>
  );
};

export default ImgCarousel;
