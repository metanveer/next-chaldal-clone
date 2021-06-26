import React, { useState } from "react";
import Modal from "./Modal";
import ProductDetail from "./ProductDetail";
import Button from "./Button";
import css from "./ProductCard.module.css";

const ProductCard = ({ item, variant }) => {
  const [clickedId, setClickedId] = useState(null);
  const [prevLocation, setPrevLocation] = useState(null);
  const [overlayShown, setOverlayShown] = useState(false);

  function handleCloseModal() {
    setClickedId(null);
    history.pushState({}, null, `${prevLocation}`);
  }

  function handleShowModal() {
    setClickedId(item.ProductVariantId);
    setPrevLocation(window.location.pathname);
    history.pushState({}, null, `/${item.Slug}`);
  }

  const name = item.NameWithoutSubText;
  const image = item.PictureUrls[0];
  const subText = item.SubText;
  const price = item.Price.Lo;
  const discPrice = item.DiscountedPrice.Lo;

  const isDiscounted = discPrice < price;

  const small = variant === "small" ? css.productCardSmall : null;
  const hor = variant === "horizontal" ? css.productCardHor : null;

  return (
    <div className={`${css.productCard} ${small} ${hor}`}>
      <div
        onMouseEnter={() => setOverlayShown(true)}
        onMouseLeave={() => setOverlayShown(false)}
        className={`${css.productCardContainer} ${
          hor && css.productCardContainerHor
        }`}
      >
        <div className={css.productCardImageWrapper}>
          <img className={css.productCardImage} src={image} alt={name} />
        </div>
        <div>
          <div className={css.productCardName}>{name}</div>
          <div className={css.productCardSubText}>{subText}</div>
          <div className={css.productCardPriceContainer}>
            {isDiscounted ? (
              <>
                <span
                  className={css.productCardDiscPrice}
                >{`৳ ${discPrice}`}</span>
                <span className={css.productCardPrice}>{`৳ ${price}`}</span>
              </>
            ) : (
              <span
                style={{ color: "inherit" }}
                className={css.productCardDiscPrice}
              >{`৳ ${price}`}</span>
            )}
          </div>
        </div>
        {overlayShown && (
          <div className={css.productCardContainerOverlay}>
            <div className={css.overlayContent}>
              <div
                className={`${css.overlayTextAdd} ${
                  hor && css.overlayTextAddHor
                }`}
              >
                Add to Shopping Bag
              </div>
            </div>
            <button
              onClick={handleShowModal}
              className={css.overlayButtonDetails}
            >
              Details {">"}
            </button>
          </div>
        )}
      </div>
      <Button type="add-to-cart" />

      {clickedId === item.ProductVariantId && (
        <Modal type="product-detail" handleCloseModal={handleCloseModal}>
          <ProductDetail product={item} />
        </Modal>
      )}
    </div>
  );
};

export default ProductCard;
