import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  showModal,
} from "../../features/toggleModal/toggleModalSlice";
import Modal from "../common/Modal";
import DeliveryPolicy from "./DeliveryPolicy";

import css from "./DeliveryPromo.module.css";

const DeliveryPromo = ({
  minAmountForPromo = 400,
  cartAmount = 200,
  deliveryCharge = 19,
  promoAmount = 10,
}) => {
  const dispatch = useDispatch();
  const { modalShown, modalId } = useSelector((state) => state.toggleModal);

  const isPromoApply = cartAmount >= minAmountForPromo;
  const amountNeeded = minAmountForPromo - cartAmount;
  const progress = isPromoApply ? 100 : (cartAmount / minAmountForPromo) * 100;
  const fullProgressStyle = isPromoApply ? css.full : null;

  return (
    <>
      <div
        onClick={() => dispatch(showModal("delivery-policy"))}
        className={css.bar}
      >
        <div className={css.helpInfo}>
          <FaInfoCircle />
        </div>
        <div className={css.deliveryCharge}>{`৳ ${
          isPromoApply ? deliveryCharge - promoAmount : deliveryCharge
        }`}</div>
        <div
          style={{ width: `${progress}%` }}
          className={`${css.progress} ${fullProgressStyle}`}
        >
          {!isPromoApply && (
            <span
              className={css.msg}
            >{`Shop ৳${amountNeeded} more and save ৳${promoAmount} fee`}</span>
          )}
          {isPromoApply && (
            <span className={css.msg}>
              You have reduced your delivery charge
            </span>
          )}
        </div>
      </div>
      {modalShown && modalId === "delivery-policy" && (
        <Modal modalWidth={400} onCloseModal={() => dispatch(hideModal())}>
          <DeliveryPolicy />
        </Modal>
      )}
    </>
  );
};

export default DeliveryPromo;
