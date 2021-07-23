import React from "react";
import classes from "./features.module.css";
import Section from "../common/section";

const images = [
  {
    image: "/people-love-chaldal/lp-features-1.webp",
    alt: "chaldal employee smiling holding a bucket full of goods",
    captionHead: "Convenient & Quick",
    caption:
      "No waiting in traffic, no haggling, no worries carrying groceries, they're delivered right at your door.",
  },
  {
    image: "/people-love-chaldal/lp-features-2.webp",
    alt: "fresh grocery items",
    captionHead: "Freshly Picked",
    caption:
      "Our fresh produce is sourced every morning, you get the best from us.",
  },
  {
    image: "/people-love-chaldal/lp-features-3.webp",
    alt: "chaldal warehouse",
    captionHead: "A wide range of Products",
    caption:
      "With 4000+ Products to choose from, forget scouring those aisles for hours.",
  },
];

const Features = () => {
  function getBorderStyle(index) {
    if (index === 1) return { borderColor: "#82a900" };
    if (index === 2) return { borderColor: "#ff686e" };
  }
  return (
    <Section type="features">
      <div className={classes.featureImagesContainer}>
        {images.map((image, index) => (
          <div key={index} className={classes.imageContainer}>
            <img className={classes.image} src={image.image} alt={image.alt} />
            <div
              className={classes.imageCaptionContainer}
              style={getBorderStyle(index)}
            >
              <div className={classes.captionHead}>{image.captionHead}</div>
              <div className={classes.caption}>{image.caption}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Features;
