import React, { useState } from "react";
import Link from "next/link";
import nameToUrl from "../../utils/name-to-url";
import css from "./Card.module.css";

const Card = ({ type, name, image, slug }) => {
  if (type === "category") {
    return (
      <Link href={`/${slug}`}>
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
