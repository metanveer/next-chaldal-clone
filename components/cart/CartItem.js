import React from "react";
import css from "./CartItem.module.css";
import { VscClose, VscChevronUp, VscChevronDown } from "react-icons/vsc";

const CartItem = ({
  qty = 6,
  packSize = "500 gm",
  image = "https://chaldn.com/_mpimage/nescafe-classic-coffee-jar-frappe-glass-free-100-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D74467&q=low&v=1&m=400&webp=1",
  itemName = "Nescafe Classic Coffee Jar (Frappe Glass Free)",
  discPrice = 60,
  price = 290,
}) => {
  return (
    <div className={css.cartItem}>
      <div className={css.btnClose}>
        <VscClose />
      </div>
      <div className={css.qtySec}>
        <div className={css.arrow}>
          <VscChevronUp />
        </div>
        <div className={css.qty}>{qty} </div>
        <div className={css.arrow}>
          <VscChevronDown />
        </div>
      </div>
      <div className={css.imageSec}>
        <img className={css.image} src={image} />
      </div>
      <div className={css.detailSec}>
        <div className={css.itemName}>{itemName}</div>
        <div className={css.qtyPackSize}>{`৳ ${
          discPrice > 0 ? discPrice : price
        } / ${packSize}`}</div>
      </div>
      <div className={css.priceSec}>
        {discPrice > 0 && (
          <div className={css.discPrice}>{`৳ ${discPrice}`}</div>
        )}

        <div className={`${discPrice && css.price}`}>{`৳ ${price}`}</div>
      </div>
    </div>
  );
};

export default CartItem;
