import { useState } from "react";
import css from "./MultiCarousel.module.css";

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

const MultiCarousel = () => {
  const slideDuration = 3000;

  const [current, setCurrent] = useState(0);
  const [userHovering, setUserHovering] = useState(false);

  console.log("current", current);

  const length = items.length;
  const cardWidth = 250;
  const marginLeft = 20;

  console.log("length", length);

  const next = (current + 1) % length;
  const prev = (current - 1 + length) % length;

  useInterval(() => {
    if (!userHovering) {
      setCurrent(next);
    }
  }, slideDuration);

  function applyTransition(current, index) {
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
    setCurrent(prev);
  }
  function handleNext() {
    setCurrent(next);
  }

  return (
    <div
      className={css.carousel}
      onMouseEnter={() => setUserHovering(true)}
      onMouseLeave={() => setUserHovering(false)}
    >
      <button className={`${css.btn} ${css.btnPrev}`} onClick={handlePrev}>
        {"<"}
      </button>
      <div className={css.visible}>
        {items.map((item, index) => (
          <span
            className={css.itemCard}
            key={index}
            style={applyTransition(current, index)}
          >
            {item.name}
          </span>
        ))}
      </div>
      <button className={`${css.btn} ${css.btnNext}`} onClick={handleNext}>
        {">"}
      </button>
    </div>
  );
};

export default MultiCarousel;
