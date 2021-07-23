import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInput } from "../../features/searchProduct/searchProductSlice";
import css from "./search-box.module.css";

const SearchBox = ({ type }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { name, value } = useSelector((state) => state.search);
  const router = useRouter();

  const hero = type === "hero";

  const pathAtSearchPage = router.pathname === "/search/[term]";

  useEffect(() => {
    if (pathAtSearchPage) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(-1, -1);
    }
    if (!pathAtSearchPage) {
      dispatch(setSearchInput({ name: "searchTerm", value: "" }));
    }
    // eslint-disable-next-line
  }, [pathAtSearchPage]);

  const inputChangeHandler = (e) => {
    e.preventDefault();
    router.push(`/search/${encodeURI(e.target.value)}`);
    dispatch(setSearchInput({ name: "searchTerm", value: e.target.value }));
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
