import React, { Fragment } from "react";
import Link from "next/link";
import FadeCarousel from "./carousels/FadeCarousel";
import css from "./Header.module.css";

const frontBanner = {
  imageOne:
    "https://chaldn.com/_mpimage?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D79459&q=low&v=1&m=300&webp=1",
  imageTwo:
    "https://chaldn.com/_mpimage?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D79460&q=low&v=1&m=910&webp=1",
  imageThree:
    "https://chaldn.com/_mpimage?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D79461&q=low&v=1&m=910&webp=1",
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

  function getParents(curCategory, allCategories) {
    const levelOne = allCategories.find(
      (item) => item.Id === curCategory.ParentCategoryId
    ) || { Name: null };
    const levelTwo = allCategories.find(
      (item) => item.Id === levelOne.ParentCategoryId
    ) || { Name: null };
    const levelThree = allCategories.find(
      (item) => item.Id === levelTwo.ParentCategoryId
    ) || { Name: null };
    return [levelOne, levelTwo, levelThree];
  }

  const parentCategoriesNames = getParents(category, allCategories).reverse();

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
                  />
                </a>
              </Link>
              <Link href="/offers">
                <a>
                  <img
                    className={css.frontBannerImg}
                    src={frontBanner.imageThree}
                  />
                </a>
              </Link>
            </div>
          </div>
        )}
        {category.Banners.length > 0 &&
          category.Banners.length <= 2 &&
          category.Banners.map((item, index) => (
            <div key={index} className={css.imageContainer}>
              <img className={css.bannerImage} src={item.BannerUrl} />
            </div>
          ))}
        {category.Banners.length > 2 && (
          <div className={css.carouselContainer}>
            <FadeCarousel images={category.Banners} />
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
