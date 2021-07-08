import React, { Fragment } from "react";
import SideBarSpecial from "./SideBarSpecial";
import css from "./SideBar.module.css";
import Categories from "./Categories";
import useGetOffers from "../../hooks/useGetOffers";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { categories } = useSelector((state) => state.categorySlice.server);
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
      <Categories categories={categories} />
    </Fragment>
  );
};

export default SideBar;
