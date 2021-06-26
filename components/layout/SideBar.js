import React, { Fragment } from "react";
import SideBarSpecial from "./SideBarSpecial";
import css from "./SideBar.module.css";
import Categories from "./Categories";
import categoriesWithSlug from "../../data/categoriesWithSlug";

const SideBar = () => {
  return (
    <Fragment>
      <div className={css.special}>
        <SideBarSpecial itemName="Coupons" />
        <SideBarSpecial itemName="Offers" offersCount="88" />
        <SideBarSpecial itemName="Food Aid" />
      </div>
      <Categories categories={categoriesWithSlug} />
    </Fragment>
  );
};

export default SideBar;
