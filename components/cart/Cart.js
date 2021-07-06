import React, { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingBag } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";

import css from "./Cart.module.css";
import DeliveryPromo from "./DeliveryPromo";
import CartItem from "./CartItem";
import Modal from "../../components/common/Modal";
import DeliveryPolicy from "../cart/DeliveryPolicy";
import decimalWithCommas from "../../utils/decimal-with-commas";
import useScrollbarSize from "react-scrollbar-size";
import {
  showModal,
  hideModal,
} from "../../features/toggleModal/toggleModalSlice";

const emptyCart =
  "https://chaldn.com/asset/Egg.Grocery.Fabric/Egg.Grocery.Web1/1.5.0+Release-2210/Default/components/header/ShoppingCart/images/emptyShoppingBag.png?q=low&webp=1&alpha=1";

const Cart = ({ onClose }) => {
  const dispatch = useDispatch();
  const { width: scrollWidth } = useScrollbarSize();

  const { items, totalItemsPriceDisc } = useSelector(
    (state) => state.cartItems
  );
  const { cartShown } = useSelector((state) => state.toggleCart);
  const { modalShown, modalId } = useSelector((state) => state.toggleModal);

  const [isExpanded, setIsExpanded] = useState(false);
  const [notifyPromo, setNotifyPromo] = useState(false);

  const minAmountForPromo = 500;
  const isPromoApplied = totalItemsPriceDisc >= minAmountForPromo;

  useEffect(() => {
    if (!cartShown && !isPromoApplied) {
      setNotifyPromo(true);
    }
    const timer = setTimeout(() => setNotifyPromo(false), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [cartShown, isPromoApplied, totalItemsPriceDisc]);

  const handleShowModal = () => {
    dispatch(showModal("delivery-policy"));
  };
  const handleHideModal = () => {
    dispatch(hideModal());
  };

  const duration = 500;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    right: `${scrollWidth}px`,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const formStyle = {
    height: "0",
    transition: "all .2s ease",
  };

  const transForm = {
    entering: { height: 0 },
    entered: { height: "50px" },
    exiting: { height: "50px" },
    exited: { height: 0 },
  };

  return (
    <>
      <Transition in={notifyPromo} timeout={duration}>
        {(state) => (
          <div
            style={{ ...defaultStyle, ...transitionStyles[state] }}
            className={css.promoNotifyWrapper}
          >
            <DeliveryPromo
              minAmountForPromo={minAmountForPromo}
              cartAmount={totalItemsPriceDisc}
              deliveryCharge={30}
              promoAmount={15}
              onShowModal={handleShowModal}
            />
          </div>
        )}
      </Transition>

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
          minAmountForPromo={minAmountForPromo}
          cartAmount={totalItemsPriceDisc}
          deliveryCharge={30}
          promoAmount={15}
          onShowModal={handleShowModal}
        />

        <div className={css.cartItemsContainer}>
          {items.length > 0 && (
            <div className={css.deliveryType}>
              <span className={css.deliveryTypeIconContainer}>
                <img
                  className={css.deliveryTypeIcon}
                  src="/categories/icons/horse.svg"
                />
              </span>
              <span className={css.text}>Express Delivery</span>
            </div>
          )}
          {items.length === 0 && (
            <div className={css.emptyCartContainer}>
              <img className={css.emptyCart} src={emptyCart} />
              <div className={css.emptyCartText}>
                Your shopping bag is empty. Start shopping
              </div>
            </div>
          )}

          {items.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
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
            <Transition in={isExpanded} timeout={200}>
              {(state) => (
                <div
                  style={{
                    ...formStyle,
                    ...transForm[state],
                  }}
                >
                  <form className={css.form}>
                    <input
                      className={css.input}
                      type="text"
                      placeholder="Special Code"
                      required
                    />
                    <button className={css.btnGo}>Go</button>
                  </form>
                </div>
              )}
            </Transition>

            {/* <p>Notify: The code is not valid</p> */}
          </div>
        </div>

        <div className={css.placeOrder}>
          {items.length > 0 ? (
            <button className={css.btnPlaceOrder}>
              <span className={css.placeOrderText}>Place Order</span>
              <span className={css.orderAmount}>
                <span className={css.takaSign}>{`৳`}</span>
                {decimalWithCommas(totalItemsPriceDisc)}
              </span>
            </button>
          ) : (
            <div className={css.contact}>Phone: 01000-000000</div>
          )}
        </div>
      </div>
      {modalShown && modalId === "delivery-policy" && (
        <Modal modalWidth={400} onCloseModal={handleHideModal}>
          <DeliveryPolicy />
        </Modal>
      )}
    </>
  );
};

export default Cart;
