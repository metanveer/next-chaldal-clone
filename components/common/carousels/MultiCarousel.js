import { useState } from "react";
import styles from "./MultiCarousel.module.css";

import useInterval from "../../../hooks/useInterval";

const items = [
  { name: "Item 0" },
  { name: "Item 1" },
  { name: "Item 2" },
  { name: "Item 3" },
  { name: "Item 4" },
  { name: "Item 5" },
  { name: "Item 6" },
  { name: "Item 7" },
  { name: "Item 8" },
  { name: "Item 9" },
  { name: "Item 10" },
  { name: "Item 11" },
  { name: "Item 12" },
  { name: "Item 13" },
  { name: "Item 14" },
  { name: "Item 15" },
  { name: "Item 16" },
];

const FirstMultiCarousel = () => {
  const slideDuration = 3000;

  const [current, setCurrent] = useState(1);
  const [userClicked, setUserClicked] = useState(false);

  // console.log("current", current);

  const length = items.length;
  const visibleCardsCount = 3;
  const cardWidth = 250;
  const marginLeft = 20;

  // console.log("length", length);

  const next = (current + 1) % length;
  const prev = (current - 1 + length) % length;

  useInterval(() => {
    if (!userClicked) {
      setCurrent(next);
    }
  }, slideDuration);

  useInterval(() => {
    if (userClicked) {
      setUserClicked(false);
    }
  }, slideDuration);

  function getVisibleSlideValue(current, index) {
    const offSet = Math.round(length / 2 + 1);
    const distanceFromLeft =
      ((current + index) % length) * -cardWidth +
      marginLeft +
      offSet * cardWidth;
    if (distanceFromLeft >= offSet * cardWidth + marginLeft)
      return { right: `${distanceFromLeft - marginLeft}px` };
    return {
      left: `${distanceFromLeft}px`,
      transition: "left 1s ease",
    };
  }

  function handlePrev() {
    setUserClicked(true);
    setCurrent(prev);
  }
  function handleNext() {
    setUserClicked(true);
    setCurrent(next);
  }

  return (
    <div className={styles.carousel}>
      <button
        onClick={handlePrev}
        className={`${styles.carouselBtn} ${styles.btnPrev}`}
      >
        {"<"}
      </button>
      <div className={styles.visibleContainer}>
        {items.map((item, index) => (
          <span
            key={index}
            className={styles.itemCard}
            style={getVisibleSlideValue(current, index)}
          >
            {item.name}
          </span>
        ))}
      </div>
      <button
        onClick={handleNext}
        className={`${styles.carouselBtn} ${styles.btnNext}`}
      >
        {">"}
      </button>
    </div>
  );
};

export default FirstMultiCarousel;
