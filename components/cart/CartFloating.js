import React from "react";
import { IoBag } from "react-icons/io5";
import css from "./CartFloating.module.css";

const CartFloating = ({ onShowCart, cartItemsCount, cartAmount }) => {
  return (
    <div onClick={onShowCart} className={css.floatingCartContainer}>
      <div className={css.cartIconContainer}>
        <IoBag />
      </div>
      <div className={css.itemsCount}>
        {cartItemsCount > 0 ? `${cartItemsCount} Items` : "Empty bag!"}
      </div>
      <div className={css.cartAmount}>{`৳ ${
        cartAmount ? cartAmount : "000"
      }`}</div>
    </div>
  );
};

export default CartFloating;
