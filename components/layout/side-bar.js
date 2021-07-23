import React from "react";
import SideBarSpecial from "./sidebar-special";
import css from "./side-bar.module.css";
import Categories from "./categories";
import useGetOffers from "../../hooks/useGetOffers";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { categories } = useSelector((state) => state.category);
  const { data } = useGetOffers();

  return (
    <div className={css.sideBar}>
      <SideBarSpecial itemName="Coupons" />
      <SideBarSpecial itemName="Offers" offersCount={data && data.length} />
      <SideBarSpecial itemName="Food Aid" />
      <div className={css.devider} />
      <Categories categories={categories} />
    </div>
  );
};

export default SideBar;
