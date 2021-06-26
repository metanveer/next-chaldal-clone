import React from "react";
import ImgCarousel from "../common/carousels/ImgCarousel";
import Section from "../common/Section";

const images = [
  {
    image: "/order-carousel/tutorial-1.webp",
  },
  {
    image: "/order-carousel/tutorial-2.webp",
  },
  {
    image: "/order-carousel/tutorial-3.webp",
  },
];

function OrderCarousel() {
  return (
    <Section title="How to order from Chaldal ?">
      <ImgCarousel images={images} />
    </Section>
  );
}

export default OrderCarousel;
