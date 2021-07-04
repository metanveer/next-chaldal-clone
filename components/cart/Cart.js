import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingBag } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";

import css from "./Cart.module.css";
import DeliveryPromo from "./DeliveryPromo";
import CartItem from "./CartItem";
import decimalWithCommas from "../../utils/decimal-with-commas";
import useScrollToBottom from "../../hooks/useScrollToBottom";

const Cart = ({ onClose }) => {
  const bottomRef = useRef();
  const { items, totalItemsPriceDisc } = useSelector(
    (state) => state.cartItems
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const cartLength = items.length;

  // function scrollToBottom() {
  //   bottomRef.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });
  // }

  // useEffect(() => {
  //   scrollToBottom();
  // }, [cartLength]);

  useScrollToBottom(bottomRef, cartLength);

  return (
    <div className={css.cart}>
      <div onClick={onClose} className={css.btnCollapse} />
      <header className={css.cartHeader}>
        <div className={css.shoppingBagIcon}>
          <FaShoppingBag />
        </div>
        <div className={css.itemsCount}>{items.length} ITEMS</div>
        <button onClick={onClose} className={css.btnClose}>
          <CgClose />
        </button>
      </header>
      <DeliveryPromo
        minAmountForPromo={500}
        cartAmount={totalItemsPriceDisc}
        deliveryCharge={30}
        promoAmount={15}
      />
      <div className={css.cartItemsContainer}>
        <div className={css.deliveryType}>
          <span className={css.deliveryTypeIconContainer}>
            <img
              className={css.deliveryTypeIcon}
              src="/categories/icons/horse.svg"
            />
          </span>
          <span className={css.text}>Express Delivery</span>
        </div>

        {items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
        <div ref={bottomRef}></div>
      </div>
      <div className={css.discountCode}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={css.btnDiscCode}
        >
          {!isExpanded && (
            <span className={css.arrow}>
              <IoChevronUpCircleOutline />
            </span>
          )}
          {isExpanded && (
            <span className={css.arrow}>
              <IoChevronDownCircleOutline />
            </span>
          )}

          <span>Have a special code?</span>
        </button>
        <div className={css.formContainer}>
          {isExpanded && (
            <form className={css.form}>
              <input
                className={css.input}
                type="text"
                placeholder="Special Code"
                required
              />
              <button className={css.btnGo}>Go</button>
            </form>
          )}
          {/* <p>The code is not valid</p> */}
        </div>
      </div>
      <div className={css.placeOrder}>
        <button className={css.btnPlaceOrder}>
          <span className={css.placeOrderText}>Place Order</span>
          <span className={css.orderAmount}>
            <span className={css.takaSign}>{`৳`}</span>
            {decimalWithCommas(totalItemsPriceDisc)}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
