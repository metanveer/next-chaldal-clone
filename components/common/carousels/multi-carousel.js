import { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import css from "./multi-carousel.module.css";
import useInterval from "../../../hooks/useInterval";
import OfferCard from "../offer-card";

const MultiCarousel = ({ items }) => {
  const slideDuration = 3000;

  const length = items.length * 2;
  const cardWidth = 260;
  const cardHeight = 393;
  const topClearance = 10;
  const spaceBetnCards = 40;
  const visibleCards = 3;

  const carouselHeight = cardHeight + topClearance * 2;
  const cardWidthWithSpace = cardWidth + spaceBetnCards;
  const visibleContainerWidth = visibleCards * cardWidthWithSpace;
  const cardsContainerWidth = items.length * cardWidthWithSpace;
  const visibleCardsContainerStyle = {
    width: visibleContainerWidth,
    marginLeft: -visibleContainerWidth / 2,
  };

  const [current, setCurrent] = useState(0);
  const [currentPre, setCurrentPre] = useState(length / 2);
  const [userHovering, setUserHovering] = useState(false);

  const next = (current + 1) % length;
  const prev = (current - 1 + length) % length;
  const nextPre = (currentPre + 1) % length;
  const prevPre = (currentPre - 1 + length) % length;

  useInterval(() => {
    if (!userHovering) {
      setCurrent(next);
      setCurrentPre(nextPre);
    }
  }, slideDuration);

  function applyTransStyle(current) {
    const leftValue =
      -current * cardWidthWithSpace + cardWidthWithSpace * (visibleCards + 2);
    if (current === 0) {
      return {
        right: `${leftValue}px`,
        width: cardsContainerWidth,
      };
    }
    return {
      left: leftValue,
      width: cardsContainerWidth,
    };
  }

  function handlePrev() {
    setCurrent(prev);
    setCurrentPre(prevPre);
  }
  function handleNext() {
    setCurrent(next);
    setCurrentPre(nextPre);
  }

  return (
    <div
      className={css.carousel}
      style={{ height: carouselHeight }}
      onMouseEnter={() => setUserHovering(true)}
      onMouseLeave={() => setUserHovering(false)}
    >
      <button className={`${css.btn} ${css.btnPrev}`} onClick={handlePrev}>
        <FaChevronLeft />
      </button>
      <div style={visibleCardsContainerStyle} className={css.visible}>
        <div className={css.cards} style={applyTransStyle(currentPre)}>
          {items.map((item, index) => (
            <div
              style={{
                margin: `${topClearance}px ${spaceBetnCards / 2}px`,
              }}
              className={css.card}
              key={index}
            >
              <OfferCard
                cardType="vertical"
                id={item._id}
                itemName={item.NameWithoutSubText}
                image={item.PictureUrls[0]}
                offerImage={item.OfferPictureUrls[0]}
                images={item.PictureUrls}
                packSize={item.SubText}
                regPrice={item.Price.Lo}
                discPrice={item.DiscountedPrice.Lo}
                description={item.LongDescription}
                slug={item.Slug}
              />
            </div>
          ))}
        </div>
        <div className={css.cards} style={applyTransStyle(current)}>
          {items.map((item, index) => (
            <div
              style={{
                margin: `${topClearance}px ${spaceBetnCards / 2}px`,
              }}
              className={css.card}
              key={index}
            >
              <OfferCard
                cardType="vertical"
                id={item._id}
                itemName={item.NameWithoutSubText}
                image={item.PictureUrls[0]}
                offerImage={item.OfferPictureUrls[0]}
                images={item.PictureUrls}
                packSize={item.SubText}
                regPrice={item.Price.Lo}
                discPrice={item.DiscountedPrice.Lo}
                description={item.LongDescription}
                slug={item.Slug}
              />
            </div>
          ))}
        </div>
      </div>
      <button className={`${css.btn} ${css.btnNext}`} onClick={handleNext}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default MultiCarousel;
