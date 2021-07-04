import React from "react";
import { IoBag } from "react-icons/io5";
import css from "./CartFloating.module.css";

import dynamic from "next/dynamic";

const Odometer = dynamic(import("react-odometerjs"), {
  ssr: false,
  loading: () => 0,
});

const CartFloating = ({ onShowCart, cartItemsCount, cartAmount }) => {
  return (
    <div onClick={onShowCart} className={css.floatingCartContainer}>
      <div className={css.cartIconContainer}>
        <IoBag />
      </div>
      <div className={css.itemsCount}>
        {cartItemsCount > 0 ? `${cartItemsCount} Items` : "Empty bag!"}
      </div>
      <div className={css.cartAmount}>
        <span className={css.taka}>৳</span>
        {cartAmount && <Odometer value={cartAmount} format="(,ddd),dd" />}
        {!cartAmount && "00"}
      </div>
    </div>
  );
};

export default CartFloating;
