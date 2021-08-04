import React, { useRef, useState, useEffect } from "react";
import css from "./cart-item.module.css";
import { VscClose, VscChevronUp, VscChevronDown } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  decreaseQty,
  removeItem,
  setAllItemsSeen,
} from "../../features/cartItems/cartItemsSlice";

const CartItem = ({
  qty,
  packSize,
  image,
  itemName,
  discPrice,
  regPrice,
  id,
  hasVisited,
  stock,
}) => {
  const dispatch = useDispatch();
  const { cartShown } = useSelector((state) => state.toggleCart);

  const cartItemRef = useRef();
  const [focused, setFocused] = useState(false);

  const isDiscountAvailable =
    discPrice && discPrice > 0 && discPrice < regPrice;
  const totalDiscPrice = discPrice * qty;
  const totalRegPrice = regPrice * qty;
  const isStockOut = stock === 0;

  useEffect(() => {
    scrollToElement(cartItemRef);
    setFocused(true);
    let timer = setTimeout(() => setFocused(false), 900);
    return () => {
      clearTimeout(timer);
    };
  }, [qty]);

  useEffect(() => {
    !hasVisited && scrollToElement(cartItemRef);
    if (cartShown) dispatch(setAllItemsSeen());
    // eslint-disable-next-line
  }, [cartShown]);

  function scrollToElement(elementRef) {
    elementRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  const handleAddToCart = () => {
    if (isStockOut) {
      return;
    }
    dispatch(
      addItemToCart({
        packSize,
        image,
        itemName,
        discPrice,
        regPrice,
        id,
        hasVisited: cartShown,
      })
    );
    dispatch(setAllItemsSeen());
  };

  const handleRemoveItem = () => dispatch(removeItem(id));

  const handleDecreaseQty = () => {
    if (isStockOut) {
      return;
    }
    if (qty === 1) return;
    dispatch(decreaseQty(id));
    dispatch(setAllItemsSeen());
  };

  const focusedStyle = focused ? css.focus : !hasVisited ? css.focus : null;

  return (
    <div
      ref={cartItemRef}
      className={`${css.cartItem} ${focusedStyle} ${
        isStockOut && css.cartItemStockOut
      }`}
    >
      <div onClick={handleRemoveItem} className={css.btnClose}>
        <VscClose />
      </div>
      <div className={css.qtySec}>
        <div onClick={handleAddToCart} className={css.arrow}>
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
        <img className={css.image} src={image} alt={itemName} />
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
