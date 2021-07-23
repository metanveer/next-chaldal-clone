import React from "react";
import css from "./delivery-policy.module.css";

const DeliveryPolicy = () => {
  return (
    <div className={css.container}>
      <div className={css.heading}>What is your delivery charge policy?</div>
      <div className={css.sub}>
        We charge ৳ 29 delivery fee for all orders below ৳ 400, and ৳ 19
        delivery fee for all other orders.
      </div>
      <ol className={css.listContainer}>
        <li className={css.listItem}>৳ 19 fee on orders of ৳ 400 and above.</li>
        <li className={css.listItem}>
          ৳ 29 fee applicable for all orders below ৳ 400.
        </li>
        <li className={css.listItem}>
          ৳ 59 fee applicable for 15 minutes delivery
        </li>
      </ol>
    </div>
  );
};

export default DeliveryPolicy;
