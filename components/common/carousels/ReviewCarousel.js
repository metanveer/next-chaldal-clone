import { useState } from "react";
import css from "./ReviewCarousel.module.css";
import Image from "next/image";
import useInterval from "../../../hooks/useInterval";

const ReviewCarousel = ({ slides }) => {
  const slideDuration = 4000;

  const [current, setCurrent] = useState(0);
  const [userHovering, setUserHovering] = useState(false);

  const length = slides.length;

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
        {slides.map((slide, index) => (
          <div
            key={index}
            onClick={() => handleSelectSlide(index)}
            className={current === index ? css.activeDot : css.dot}
          ></div>
        ))}
      </div>
      <div className={css.allSlides} style={getSlideStyle(current)}>
        {slides.map((slide, index) => (
          <div key={index} className={css.slide}>
            <div className={css.portraitContainer}>
              <Image
                className={css.portrait}
                src={slide.image}
                alt={slide.name}
                width={130}
                height={130}
              />
              <div className={css.portraitName}>{slide.name}</div>
            </div>
            <div className={css.review}>
              <p className={css.reviewText}>{slide.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel;
