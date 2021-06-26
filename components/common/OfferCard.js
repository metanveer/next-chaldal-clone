import React from "react";
import css from "./OfferCard.module.css";
import ProductCard from "./ProductCard";

const OfferCard = ({ product, variant }) => {
  const ver = variant === "vertical";

  return (
    <div className={`${css.offerCard} ${ver && css.offerCardVer}`}>
      <div className={`${ver && css.offerImageContainerVer}`}>
        <img
          className={`${css.image} ${ver && css.imageVer}`}
          src={product.OfferPictureUrls[0]}
          alt={product.Name}
        />
      </div>
      <div
        className={`${css.productCardWrapper} ${
          ver && css.productCardWrapperVer
        }`}
      >
        <ProductCard
          item={product}
          variant={`${ver ? "horizontal" : "small"}`}
        />
      </div>
    </div>
  );
};

export default OfferCard;
