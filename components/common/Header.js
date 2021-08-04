import React, { Fragment } from "react";
import Link from "next/link";
import FadeCarousel from "./carousels/fade-carousel";
import css from "./header.module.css";
import { getParentsArray } from "../../utils/get-parent-category";

const frontBanner = {
  imageOne: "/food-page-banner/image-one.webp",
  imageTwo: "/food-page-banner/image-two.webp",
  imageThree: "/food-page-banner/image-three.webp",
};

const Header = ({ type, category, allCategories }) => {
  if (type === "product-detail-page") {
    return (
      <header className={css.productDetailHeader}>
        <p>
          Why Choose <strong>Chaldal?</strong>
        </p>
        <img
          src="/product-detail/Banner700Wide.webp"
          alt="why choose chaldal"
        />
      </header>
    );
  }

  const parentCategoriesNames = getParentsArray(
    category,
    allCategories
  ).reverse();

  return (
    <header>
      <div className={css.categoryBanner}>
        {category.Name === "Food" && (
          <div className={css.frontPageBanner}>
            <div className={css.frontBannerLeft}>
              <Link href="/popular">
                <a>
                  <img
                    className={css.frontBannerImg}
                    src={frontBanner.imageOne}
                    alt=""
                  />
                </a>
              </Link>
            </div>
            <div className={css.frontBannerRight}>
              <Link href="/fresh-fruits">
                <a>
                  <img
                    className={`${css.frontBannerImg} ${css.rightTopImg}`}
                    src={frontBanner.imageTwo}
                    alt=""
                  />
                </a>
              </Link>
              <Link href="/offers">
                <a>
                  <img
                    className={css.frontBannerImg}
                    src={frontBanner.imageThree}
                    alt=""
                  />
                </a>
              </Link>
            </div>
          </div>
        )}
        {category.Name !== "Food" && (
          <div className={css.imagesContainer}>
            {category.Banners.length > 0 &&
              category.Banners.length <= 2 &&
              category.Banners.map((item, index) => (
                <div key={index} className={css.imageWrapper}>
                  <img className={css.bannerImage} src={item.BannerUrl} />
                </div>
              ))}
            {category.Banners.length > 2 && (
              <div className={css.carouselContainer}>
                <FadeCarousel images={category.Banners} />
              </div>
            )}
          </div>
        )}
      </div>
      <div className={css.categoryHeaderContainer}>
        <div className={css.categoryPaths}>
          {parentCategoriesNames.map((item, index) => (
            <Fragment key={index}>
              {item.Name && (
                <>
                  <Link href={`/${item.slug}`}>
                    <a className={css.categoryName}>{item.Name}</a>
                  </Link>
                  <span className={css.arrow} />
                </>
              )}
            </Fragment>
          ))}
          <span className={`${css.categoryName} ${css.activeCategory} `}>
            {category.Name}
          </span>
        </div>
        <div className={css.categoryHeader}>
          <div className={css.hrLine} />
          <p className={css.heading}>{category.Name}</p>
          <div className={css.hrLine} />
        </div>
      </div>
    </header>
  );
};

export default Header;
