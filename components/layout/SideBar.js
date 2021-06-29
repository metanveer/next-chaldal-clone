import React, { Fragment } from "react";
import SideBarSpecial from "./SideBarSpecial";
import css from "./SideBar.module.css";
import Categories from "./Categories";
import categoriesWithSlug from "../../data/categoriesWithSlug";
import useGetOffers from "../../hooks/useGetOffers";

const SideBar = () => {
  const { data } = useGetOffers();

  return (
    <Fragment>
      <div className={css.special}>
        <SideBarSpecial itemName="Coupons" />
        <SideBarSpecial
          itemName="Offers"
          offersCount={data && data.data.length}
        />
        <SideBarSpecial itemName="Food Aid" />
      </div>
      <Categories categories={categoriesWithSlug} />
    </Fragment>
  );
};

export default SideBar;
