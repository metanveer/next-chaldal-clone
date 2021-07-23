import React from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import css from "./button.module.css";

const Button = ({ btnType, onIncreaseQty, onDecreaseQty, itemInCart }) => {
  if (btnType === "add-to-cart") {
    return (
      <>
        {!itemInCart && (
          <button onClick={onIncreaseQty} className={css.buttonAddToCart}>
            <div className={css.buttonIcon}>
              <img src="/categories/icons/horse.svg" alt="Home Appliances" />
            </div>
            <div className={css.buttonText}>Add to bag</div>
          </button>
        )}
        {itemInCart && (
          <button className={css.buttonAddToCartInBag}>
            <div
              onClick={onDecreaseQty}
              className={`${css.btn} ${css.btnMinus}`}
            >
              <HiOutlineMinus />
            </div>
            <div onClick={onIncreaseQty} className={css.buttonText}>
              {itemInCart.qty} in bag
            </div>
            <div
              onClick={onIncreaseQty}
              className={`${css.btn} ${css.btnPlus}`}
            >
              <HiOutlinePlus />
            </div>
          </button>
        )}
      </>
    );
  }
};

export default Button;
