import React from "react";
import { IoBag } from "react-icons/io5";
import css from "./CartFloating.module.css";

const CartFloating = ({
  onShowCart,
  cartItemsCount = 29,
  cartAmount = 2986,
}) => {
  return (
    <div onClick={onShowCart} className={css.floatingCartContainer}>
      <div className={css.cartIconContainer}>
        <IoBag />
      </div>
      <div className={css.itemsCount}>{cartItemsCount} Items</div>
      <div className={css.cartAmount}>{`৳ ${cartAmount}`}</div>
    </div>
  );
};

export default CartFloating;
