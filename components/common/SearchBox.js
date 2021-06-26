import React from "react";
import { BiSearch } from "react-icons/bi";
import styles from "./SearchBox.module.css";

const SearchBox = ({ type }) => {
  if (type === "hero") {
    return (
      <div className={styles.searchBoxBanner}>
        <input
          className={styles.searchInputBanner}
          placeholder="Search for products (e.g. eggs, milk, potato)"
        />
        <button type="submit" className={styles.searchButtonBanner}>
          <BiSearch />
        </button>
      </div>
    );
  }

  return (
    <div className={styles.searchBox}>
      <input
        className={styles.searchInput}
        placeholder="Search for products (e.g. eggs, milk, potato)"
      />
      <button type="submit" className={styles.searchButton}>
        <BiSearch />
      </button>
    </div>
  );
};

export default SearchBox;
