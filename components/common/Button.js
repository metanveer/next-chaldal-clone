import React from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import css from "./button.module.css";
import ExpressDeliveryIcon from "./express-delivery-icon";
import ReqStockIcon from "./req-stock-icon";

const Button = ({
  btnType,
  onIncreaseQty,
  onDecreaseQty,
  itemInCart,
  onReqStock,
  stock,
}) => {
  if (btnType === "add-to-cart") {
    return (
      <>
        {stock === 0 ? (
          <button onClick={onReqStock} className={css.buttonAddToCart}>
            <ReqStockIcon />
            <div className={css.buttonText}>Request Stock</div>
          </button>
        ) : itemInCart ? (
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
        ) : (
          <button onClick={onIncreaseQty} className={css.buttonAddToCart}>
            <ExpressDeliveryIcon />
            <div className={css.buttonText}>Add to bag</div>
          </button>
        )}
      </>
    );
  }
};

export default Button;
