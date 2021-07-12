import React, { Fragment } from "react";
import SideBarSpecial from "./SideBarSpecial";
import css from "./SideBar.module.css";
import Categories from "./Categories";
import Loader from "../common/Loader";
import useGetOffers from "../../hooks/useGetOffers";
import { useSelector } from "react-redux";
import useGetCategories from "../../hooks/useGetCategories";

const SideBar = () => {
  const { categories } = useSelector((state) => state.category);
  const { data } = useGetOffers();

  const { data: catData } = useGetCategories();

  return (
    <Fragment>
      <div className={css.special}>
        <SideBarSpecial
          itemName="Offers"
          offersCount={data && data.data.length}
        />
        <SideBarSpecial itemName="Food Aid" />
      </div>
      {categories.length !== 0 && <Categories categories={categories} />}
      {categories.length === 0 && !catData && <Loader />}
      {categories.length === 0 && catData && (
        <Categories categories={catData.data} />
      )}
    </Fragment>
  );
};

export default SideBar;
