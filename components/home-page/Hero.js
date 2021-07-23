import React from "react";
import SearchBox from "../common/search-box";
import css from "./hero.module.css";

function Hero() {
  return (
    <header className={css.homeTopBanner}>
      <span className={css.homeBannerText}>Groceries delivered in 1 hour</span>
      <SearchBox type="hero" />
    </header>
  );
}

export default Hero;
