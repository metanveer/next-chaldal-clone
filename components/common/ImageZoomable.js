import React, { useState } from "react";
import css from "./ImageZoomable.module.css";

const ImageZoomable = ({ src }) => {
  const [bgStyle, setBgStyle] = useState({
    backgroundImage: `url(${src})`,
    backgroundPosition: "0% 0%",
  });

  const handleMouseMove = (e) => {
    console.log("mouse hovering");
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    console.log("x", x);
    console.log("y", y);
    setBgStyle({ backgroundPosition: `${x}% ${y}%` });
  };

  return (
    <div className={css.wrapper}>
      <figure
        className={css.imageWrapper}
        onMouseOver={handleMouseMove}
        style={bgStyle}
      >
        <img className={css.image} src={src} />
      </figure>
    </div>
  );
};

export default ImageZoomable;
