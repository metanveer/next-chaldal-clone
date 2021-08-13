import { useRouter } from "next/dist/client/router";
import React from "react";
import css from "./empty-cart.module.css";

const emptyCart =
  "https://chaldn.com/asset/Egg.Grocery.Fabric/Egg.Grocery.Web1/1.5.0+DataCenter-Release-2261/Default/components/header/ShoppingCart/images/emptyShoppingBag.png?q=low&webp=1&alpha=1";

const EmptyCart = ({ checkout }) => {
  const router = useRouter();
  return (
    <div className={css.emptyCartContainer}>
      <img
        className={css.emptyCart}
        src={emptyCart}
        alt="An empty shopping bag"
      />
      <div className={css.emptyCartText}>
        Your shopping bag is empty.{" "}
        {checkout
          ? "Please add some products before checkout."
          : "Start shopping"}
      </div>
      {checkout && <button className={css.button}>Start shopping now</button>}
    </div>
  );
};

export default EmptyCart;
