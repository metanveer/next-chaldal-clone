import React, { useState } from "react";
import useScrollbarSize from "react-scrollbar-size";
import { useSelector, useDispatch } from "react-redux";
import { showCart, hideCart } from "../../features/toggleCart/toggleCartSlice";
import NavBar from "./nav-bar";
import SideBar from "./side-bar";

import css from "./layout.module.css";
import Cart from "../cart/cart";
import CartFloating from "../cart/cart-floating";
import useBounceAnimation from "../../hooks/useBounceAnimation";
import { setAllItemsSeen } from "../../features/cart/cartSlice";

const Layout = ({ children }) => {
  const [sidebarShown, setSidebarShown] = useState(true);

  const dispatch = useDispatch();
  const { cartShown } = useSelector((state) => state.toggleCart);
  const { items, totalItemsPriceDisc } = useSelector((state) => state.cart);

  const { width: scrollBarWidth } = useScrollbarSize();
  const cartWidth = 320;
  // const scrollBarWidth = 0;

  const bounceStyle = useBounceAnimation(totalItemsPriceDisc, css.bounce, 900);

  function handleHideCart() {
    dispatch(hideCart(items));
  }

  function handleShowCart() {
    dispatch(showCart(items));
    dispatch(setAllItemsSeen());
  }

  return (
    <div className={css.layout}>
      <div className={css.navbarWrapper}>
        <NavBar handleSideBar={() => setSidebarShown(!sidebarShown)} />
      </div>

      <div className={sidebarShown ? css.sideBar : css.sideBarHide}>
        <SideBar />
      </div>

      <div
        style={{ right: `${scrollBarWidth}px` }}
        className={`${css.cartFloatingWrapper} ${bounceStyle}`}
      >
        <CartFloating
          onShowCart={handleShowCart}
          cartItemsCount={items.length}
          cartAmount={totalItemsPriceDisc}
        />
      </div>
      <div
        style={{
          right: `${
            cartShown
              ? `${scrollBarWidth}px`
              : `-${scrollBarWidth + cartWidth}px`
          }`,
        }}
        className={css.cartWrapper}
      >
        <Cart onClose={handleHideCart} />
      </div>
      <main className={sidebarShown ? css.main : css.mainExtended}>
        <div className={css.pageWrapper}>
          <div
            className={`${css.page} ${
              cartShown ? css.pageCartVisible : css.pageCartHidden
            }`}
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
