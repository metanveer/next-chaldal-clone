import React, { useState } from "react";
import useScrollbarSize from "react-scrollbar-size";
import { useSelector, useDispatch } from "react-redux";
import { showCart, hideCart } from "../../features/toggleCart/toggleCartSlice";
// import Login from "../../pages/Login/Login";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
// import Modal from "../UI/Modal";

import css from "./Layout.module.css";
import Cart from "../cart/Cart";
import CartFloating from "../cart/CartFloating";
import useFocusElement from "../../hooks/useFocusElement";

const Layout = ({ children }) => {
  const [modalShown, setModalShown] = useState(false);
  const [sidebarShown, setSidebarShown] = useState(true);

  const dispatch = useDispatch();
  const { cartShown } = useSelector((state) => state.toggleCart);
  const { items, totalItemsPriceDisc } = useSelector(
    (state) => state.cartItems
  );

  const { width: scrollBarWidth } = useScrollbarSize();
  const cartWidth = 320;

  const focusedStyle = useFocusElement(
    undefined,
    totalItemsPriceDisc,
    css.bounce
  );

  return (
    <div className={css.layout}>
      {/* {modalShown && (
        <Modal handleCloseModal={() => setModalShown(false)}>
          <Login />
        </Modal>
      )} */}
      <nav className={css.navBar}>
        <NavBar
          handleSideBar={() => setSidebarShown(!sidebarShown)}
          setModalShown={setModalShown}
        />
      </nav>

      <div className={sidebarShown ? css.sideBar : css.sideBarHide}>
        <SideBar />
      </div>

      <div
        style={{ right: `${scrollBarWidth}px` }}
        className={`${css.cartFloatingWrapper} ${focusedStyle}`}
      >
        <CartFloating
          onShowCart={() => dispatch(showCart())}
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
        <Cart onClose={() => dispatch(hideCart())} />
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
