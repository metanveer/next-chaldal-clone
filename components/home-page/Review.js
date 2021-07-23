import React from "react";
import ReviewCarousel from "../common/carousels/review-carousel";
import Section from "../common/section";

const clients = [
  {
    name: "Srabon Megh",
    image: "/review-clients-img/client-1.jpg",
    review:
      "I want to order something (A perfume) for my mom at BD. Although the delivery area was out of their scope, their support team instantly replied to my query and manged to deliver the product. The best thing I noticed, they informed step by step updated news about the order processing.",
  },
  {
    name: "Rodela Dupur",
    image: "/review-clients-img/client-2.jpg",
    review:
      "I have been shopping from chaldal for the past few months and i am loving the experience. Have been shopping from here and i have recommended my relatives too. They are also happy with the service. The prices are comparatively low and the products are genuine.",
  },
  {
    name: "Singdha Sokal",
    image: "/review-clients-img/client-3.jpg",
    review:
      "Loved the service! I urgently needed some stuffs and ordered it here and they delivered in less than an hour as promised! Thanks a lot for that.",
  },
  {
    name: "Obiram Brishty",
    image: "/review-clients-img/client-4.jpg",
    review:
      "Satisfied by their professionalism ! Got my tea bags in time. Didn't have to pay any delivery charge. I can't believe that. Keep it up !",
  },
  {
    name: "Prakhar Roddur",
    image: "/review-clients-img/client-5.jpg",
    review:
      "Congratulations for being nominated for 9th best entrepreneur among 500 new entrepreneurs by Forbes Magazine!!! I wish chaldal team the very best.. And your products types, brand types need to be extended more.",
  },
];

function Review() {
  return (
    <Section type="review" title="What our clients are saying">
      <ReviewCarousel slides={clients} />
    </Section>
  );
}

export default Review;
