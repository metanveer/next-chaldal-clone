import React, { useState } from "react";
import Link from "next/link";
import nameToUrl from "../../utils/name-to-url";
import css from "./Card.module.css";
import Button from "./Button";

const Card = ({
  type,
  productId,
  name,
  image,
  subText,
  price,
  discPrice,
  slug,
  onClickDetail,
  setPrevLocation,
}) => {
  const [overlayShown, setOverlayShown] = useState(false);

  function handleClick() {
    onClickDetail(productId);
    setPrevLocation(window.location.pathname);
    history.pushState({}, null, `/${slug}`);
  }

  const isDiscounted = discPrice < price;

  if (type === "product") {
    return (
      <span className={css.productCardContainerWrapper}>
        <div
          onMouseEnter={() => setOverlayShown(true)}
          onMouseLeave={() => setOverlayShown(false)}
          className={css.productCardContainer}
        >
          <div className={css.productCardImageWrapper}>
            <img className={css.productCardImage} src={image} alt={name} />
          </div>
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
          {overlayShown && (
            <div className={css.productCardContainerOverlay}>
              <div className={css.overlayContent}>
                <div className={css.overlayTextAdd}>Add to Shopping Bag</div>
              </div>
              <button
                onClick={handleClick}
                className={css.overlayButtonDetails}
              >
                Details {">"}
              </button>
            </div>
          )}
        </div>
        <Button type="add-to-cart" />
      </span>
    );
  }
  if (type === "category") {
    return (
      <Link href={`/${nameToUrl(name)}`}>
        <a>
          <div className={css.categoryCardContainer}>
            <img
              className={css.categoryCardImageContainer}
              src={image}
              alt={name}
            />
            <div className={css.categoryCardName}>{name}</div>
          </div>
        </a>
      </Link>
    );
  }

  return (
    <Link href={`/${nameToUrl(name)}`}>
      <a>
        <div className={css.homeCategoryCard}>
          <div className={css.homeCategoryName}>{name}</div>
          <img className={css.homeCategoryImage} src={image} alt={name} />
        </div>
      </a>
    </Link>
  );
};

export default Card;
