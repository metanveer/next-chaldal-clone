import React from "react";
import css from "./offer-card.module.css";
import ProductCard from "./product-card";

const OfferCard = ({
  cardType,
  id,
  itemName,
  image,
  offerImage,
  images,
  packSize,
  regPrice,
  discPrice,
  description,
  slug,
  stock,
}) => {
  const ver = cardType === "vertical";

  return (
    <div className={`${css.offerCard} ${ver && css.offerCardVer}`}>
      <div className={`${ver && css.offerImageContainerVer}`}>
        <img
          className={`${css.image} ${ver && css.imageVer}`}
          src={offerImage}
          alt={itemName}
        />
      </div>
      <div
        className={`${css.productCardWrapper} ${
          ver && css.productCardWrapperVer
        }`}
      >
        <ProductCard
          cardType={`${ver ? "horizontal" : "small"}`}
          id={id}
          itemName={itemName}
          image={image}
          images={images}
          packSize={packSize}
          regPrice={regPrice}
          discPrice={discPrice}
          description={description}
          slug={slug}
          stock={stock}
        />
      </div>
    </div>
  );
};

export default OfferCard;
