import React from "react";
import { useSelector } from "react-redux";
import css from "./delivery-policy.module.css";

const DeliveryPolicy = () => {
  const { deliveryChargeReg, promoAmount, minAmountForPromo } = useSelector(
    (state) => state.cart
  );

  return (
    <div className={css.container}>
      <div className={css.heading}>What is your delivery charge policy?</div>
      <div className={css.sub}>
        We charge ৳ {deliveryChargeReg} delivery fee for all orders below ৳{" "}
        {minAmountForPromo}, and ৳ 19 delivery fee discount is applicable for
        orders above ৳ {minAmountForPromo}.
      </div>
      <ol className={css.listContainer}>
        <li className={css.listItem}>
          Delivery fee discount ৳ {promoAmount} applicable on orders of ৳{" "}
          {minAmountForPromo} and above.
        </li>
        <li className={css.listItem}>
          ৳ {deliveryChargeReg} fee applicable for all orders below ৳{" "}
          {minAmountForPromo}.
        </li>
      </ol>
    </div>
  );
};

export default DeliveryPolicy;
