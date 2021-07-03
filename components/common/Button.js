import React from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  decreaseQty,
  increaseQty,
} from "../../features/cartItems/cartItemsSlice";
import css from "./Button.module.css";

const Button = ({ type, onAddItemToCart, itemInCart }) => {
  const dispatch = useDispatch();

  if (type === "add-to-cart") {
    return (
      <>
        {!itemInCart && (
          <button onClick={onAddItemToCart} className={css.buttonAddToCart}>
            <div className={css.buttonIcon}>
              <img src="/categories/icons/horse.svg" alt="Home Appliances" />
            </div>
            <div className={css.buttonText}>Add to bag</div>
          </button>
        )}
        {itemInCart && (
          <button className={css.buttonAddToCartInBag}>
            <div
              onClick={() => dispatch(decreaseQty(itemInCart.id))}
              className={`${css.btn} ${css.btnMinus}`}
            >
              <HiOutlineMinus />
            </div>
            <div onClick={onAddItemToCart} className={css.buttonText}>
              {itemInCart.qty} in bag
            </div>
            <div
              onClick={() => dispatch(increaseQty(itemInCart.id))}
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
