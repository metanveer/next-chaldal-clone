import React, { useRef } from "react";
import css from "./CartItem.module.css";
import { VscClose, VscChevronUp, VscChevronDown } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQty,
  increaseQty,
  removeItem,
} from "../../features/cartItems/cartItemsSlice";
import useFocusElement from "../../hooks/useFocusElement";

const CartItem = ({
  qty,
  packSize,
  image,
  itemName,
  discPrice,
  regPrice,
  id,
}) => {
  const dispatch = useDispatch();
  const cartItemRef = useRef();

  const isDiscountAvailable =
    discPrice && discPrice > 0 && discPrice < regPrice;
  const totalDiscPrice = discPrice * qty;
  const totalRegPrice = regPrice * qty;

  function handleDecreaseQty() {
    if (qty === 1) return;
    dispatch(decreaseQty(id));
  }

  const focusedStyle = useFocusElement(cartItemRef, qty, css.focus, 800);

  return (
    <div ref={cartItemRef} className={`${css.cartItem} ${focusedStyle}`}>
      <div onClick={() => dispatch(removeItem(id))} className={css.btnClose}>
        <VscClose />
      </div>
      <div className={css.qtySec}>
        <div onClick={() => dispatch(increaseQty(id))} className={css.arrow}>
          <VscChevronUp />
        </div>
        <div className={css.qty}>{qty} </div>
        <div
          onClick={handleDecreaseQty}
          className={`${qty === 1 ? css.arrowDisable : css.arrow}`}
        >
          <VscChevronDown />
        </div>
      </div>
      <div className={css.imageSec}>
        <img className={css.image} src={image} />
      </div>
      <div className={css.detailSec}>
        <div className={css.itemName}>{itemName}</div>
        <div className={css.qtyPackSize}>{`৳ ${
          isDiscountAvailable ? discPrice : regPrice
        } / ${packSize}`}</div>
      </div>
      <div className={css.priceSec}>
        {isDiscountAvailable && (
          <div className={css.discPrice}>{`৳ ${totalDiscPrice}`}</div>
        )}

        <div
          className={`${isDiscountAvailable && css.price}`}
        >{`৳ ${totalRegPrice}`}</div>
      </div>
    </div>
  );
};

export default CartItem;
