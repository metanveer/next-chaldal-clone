import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

import css from "./delivery-promo.module.css";

const DeliveryPromo = ({ onShowModal }) => {
  const {
    totalItemsPriceDisc,
    deliveryChargeReg,
    promoAmount,
    minAmountForPromo,
    promoDeliveryCharge,
    isPromoApply,
  } = useSelector((state) => state.cart);

  const amountNeeded = minAmountForPromo - totalItemsPriceDisc;
  const progress = isPromoApply
    ? 100
    : (totalItemsPriceDisc / minAmountForPromo) * 100;
  const fullProgressStyle = isPromoApply ? css.full : null;

  return (
    <>
      <div onClick={onShowModal} className={css.bar}>
        <div className={css.helpInfo}>
          <FaInfoCircle />
        </div>
        <div className={css.deliveryCharge}>{`৳ ${
          isPromoApply ? promoDeliveryCharge : deliveryChargeReg
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
    </>
  );
};

export default DeliveryPromo;
