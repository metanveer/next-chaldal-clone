import React, { useState, Fragment } from "react";
import css from "./pictures-magnify.module.css";

const PicturesMagnify = ({ pictureUrls }) => {
  const [isHoveringImg, setIsHoveringImg] = useState(false);
  const [isHoveringLeftSec, setIsHoveringLeftSec] = useState(false);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [current, setCurrent] = useState(0);

  const length = pictureUrls.length;
  const next = (current + 1) % length;
  const prev = (current - 1 + length) % length;

  function handleMouseMove(e) {
    const clientRect = e.target.getBoundingClientRect();

    const { left, top, width, height } = clientRect;
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setX(x);
    setY(y);
  }

  function getZoomStyle(x, y) {
    const zoomedTop = 5 + 10;
    const zoomedBottom = -150 - 10;
    const yFactor = (zoomedTop - zoomedBottom) / 100;

    const zoomedLeft = 10 + 10;
    const zoomedRight = -60 - 50;
    const xFactor = (zoomedLeft - zoomedRight) / 100;

    const leftValue = `${-x * xFactor + zoomedLeft}%`;
    const topValue = `${-y * yFactor + zoomedTop}%`;

    return {
      left: leftValue,
      top: topValue,
    };
  }

  return (
    <Fragment>
      <div
        onMouseEnter={() => setIsHoveringLeftSec(true)}
        onMouseLeave={() => setIsHoveringLeftSec(false)}
        className={css.imageAndArrowsContainer}
      >
        <div
          onMouseLeave={() => setIsHoveringImg(false)}
          className={css.productImageContainer}
        >
          <img
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHoveringImg(true)}
            className={css.productImage}
            src={pictureUrls[current]}
            alt=""
          />
        </div>

        <div
          style={{ display: `${isHoveringImg ? "block" : "none"}` }}
          className={css.productImageZoomContainer}
        >
          <img
            style={getZoomStyle(x, y)}
            className={css.productImageZoom}
            src={pictureUrls[current]}
            alt=""
          />
        </div>
        {length > 1 && (
          <>
            <button
              onClick={() => setCurrent(prev)}
              style={{ opacity: `${isHoveringLeftSec ? 1 : 0}` }}
              className={`${css.btn} ${css.btnPrev}`}
            >
              <img
                className={css.arrow}
                src="./product-detail/prev-arrow.svg"
                alt="previous"
              />
            </button>
            <button
              onClick={() => setCurrent(next)}
              style={{ opacity: `${isHoveringLeftSec ? 1 : 0}` }}
              className={`${css.btn} ${css.btnNext}`}
            >
              <img
                className={css.arrow}
                src="./product-detail/next-arrow.svg"
                alt="next"
              />
            </button>
          </>
        )}
      </div>
      {length > 1 && (
        <div className={css.bottomThumbnails}>
          {pictureUrls.map((url, index) => (
            <img
              onClick={() => setCurrent(index)}
              key={index}
              className={`${css.bottomThumbnail} ${
                index === current ? css.bottomThumbnailActive : null
              }`}
              src={url}
              alt=""
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default PicturesMagnify;
