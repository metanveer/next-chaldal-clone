import React, { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingBag } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";

import css from "./cart.module.css";
import DeliveryPromo from "./delivery-promo";
import CartItem from "./cart-item";
import Modal from "../common/modal";
import DeliveryPolicy from "./delivery-policy";
import decimalWithCommas from "../../utils/decimal-with-commas";
import useScrollbarSize from "react-scrollbar-size";
import {
  showModal,
  hideModal,
} from "../../features/toggleModal/toggleModalSlice";
import ExpressDeliveryIcon from "../common/express-delivery-icon";
import { useRouter } from "next/dist/client/router";
import EmptyCart from "../common/ui/empty-cart";

const Cart = ({ onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { width: scrollWidth } = useScrollbarSize();

  const {
    items,
    totalItemsPriceDisc,
    msg,
    deliveryChargeReg,
    promoAmount,
    minAmountForPromo,
    isPromoApply,
  } = useSelector((state) => state.cart);
  const { cartShown } = useSelector((state) => state.toggleCart);
  const { modalShown, modalId } = useSelector((state) => state.toggleModal);

  const [isExpanded, setIsExpanded] = useState(false);
  const [notifyPromo, setNotifyPromo] = useState(false);

  useEffect(() => {
    if (!cartShown && !isPromoApply && msg !== "Initial state") {
      setNotifyPromo(true);
    }
    const timer = setTimeout(() => setNotifyPromo(false), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [cartShown, isPromoApply, totalItemsPriceDisc, msg]);

  const handleShowModal = () => {
    dispatch(showModal("delivery-policy"));
  };
  const handleHideModal = () => {
    dispatch(hideModal());
  };

  const duration = 400;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    right: `${scrollWidth}px`,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { display: "none" },
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

  const handlePlaceOrder = () => {
    router.push("/checkout");
  };

  return (
    <>
      <Transition in={notifyPromo} timeout={duration}>
        {(state) => (
          <div
            style={{ ...defaultStyle, ...transitionStyles[state] }}
            className={css.promoNotifyWrapper}
          >
            <DeliveryPromo onShowModal={handleShowModal} />
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
          deliveryCharge={29}
          promoAmount={19}
          onShowModal={handleShowModal}
        />

        <div className={css.cartItemsContainer}>
          {items.length > 0 && (
            <div className={css.deliveryType}>
              <span className={css.deliveryTypeIconContainer}>
                <ExpressDeliveryIcon color="#4D4D49" />
              </span>
              <span className={css.text}>Express Delivery</span>
            </div>
          )}
          {items.length === 0 && <EmptyCart />}

          {items.map((item, index) => (
            <CartItem key={index} {...item} />
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
            <button onClick={handlePlaceOrder} className={css.btnPlaceOrder}>
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
        <Modal modalWidth={400} onCloseModal={handleHideModal} closeBtn>
          <DeliveryPolicy />
        </Modal>
      )}
    </>
  );
};

export default Cart;
