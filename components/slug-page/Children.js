import React, { Fragment, useState } from "react";
import Card from "../common/Card";
import OfferCard from "../common/OfferCard";
import ProductCard from "../common/ProductCard";
import css from "./Children.module.css";

const Children = ({ type, variant, categories, products, currentCategory }) => {
  if (type === "categories") {
    return (
      <div className={css.childCategories}>
        {categories &&
          categories
            .filter((item) => item.ParentCategoryId === currentCategory.Id)
            .map((item) => (
              <div className={css.categoriesCardWrapper} key={item.Id}>
                <Card
                  type="category"
                  name={item.Name}
                  image={item.Picture.ImageUrl}
                  slug={item.slug}
                />
              </div>
            ))}
      </div>
    );
  }
  if (type === "products") {
    if (products.length === 0) {
      return (
        <div className={css.childCategories}>
          No product found under this category
        </div>
      );
    }

    if (variant === "offer") {
      return (
        <div className={css.childCategories}>
          {products.map((item) => (
            <div className={css.productCardWrapper} key={item.ProductVariantId}>
              <OfferCard product={item} />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className={css.childCategories}>
        {products.map((item) => (
          <div className={css.productCardWrapper} key={item.ProductVariantId}>
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    );
  }
};

export default Children;
