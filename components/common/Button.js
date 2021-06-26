import React from "react";
import css from "./Button.module.css";

const Button = ({ type }) => {
  if (type === "add-to-cart") {
    return (
      <button className={css.buttonAddToCart}>
        <div className={css.buttonIcon}>
          <img src="/categories/icons/horse.svg" alt="Home Appliances" />
        </div>
        <div className={css.buttonText}>Add to bag</div>
      </button>
    );
  }
};

export default Button;
