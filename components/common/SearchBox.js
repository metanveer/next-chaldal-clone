import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTermClient } from "../../features/searchProduct/searchProductSlice";
import css from "./SearchBox.module.css";

const SearchBox = ({ type }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { name, value } = useSelector((state) => state.search.client.input);
  const router = useRouter();

  const hero = type === "hero";

  const searchSlug = router.query.term;
  const pathAtSearchPage = router.pathname === "/search/[term]";

  useEffect(() => {
    if (pathAtSearchPage && searchSlug) {
      inputRef.current.focus();
      dispatch(
        setSearchTermClient({ name: "searchTerm", value: router.query.term })
      );
    }
    if (!pathAtSearchPage) {
      dispatch(setSearchTermClient({ name: "searchTerm", value: "" }));
    }
  }, [pathAtSearchPage]);

  const inputChangeHandler = (e) => {
    dispatch(
      setSearchTermClient({ name: "searchTerm", value: e.target.value })
    );
    router.push(`/search/${e.target.value}`);
  };

  return (
    <form className={`${css.searchBox} ${hero && css.searchBoxBanner}`}>
      <input
        ref={inputRef}
        onChange={inputChangeHandler}
        type="text"
        name={name}
        value={value}
        required
        className={`${css.searchInput} ${hero && css.atBanner}`}
        placeholder="Search for products (e.g. eggs, milk, potato)"
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={value !== ""}
        className={`${css.searchButton} ${hero && css.btnAtBanner}`}
      >
        <BiSearch />
      </button>
    </form>
  );
};

export default SearchBox;
