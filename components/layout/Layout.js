import React, { Fragment, useState } from "react";
// import Login from "../../pages/Login/Login";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
// import Modal from "../UI/Modal";

import css from "./Layout.module.css";
import Cart from "../cart/Cart";
import CartFloating from "../cart/CartFloating";

const Layout = ({ children }) => {
  const [modalShown, setModalShown] = useState(false);
  const [sidebarShown, setSidebarShown] = useState(true);
  const [cartShown, setCartShown] = useState(false);

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

      <div className={css.cartFloatingWrapper}>
        <CartFloating onShowCart={() => setCartShown(true)} />
      </div>
      <div
        className={`${css.cartWrapper} ${
          cartShown ? css.cartVisible : css.cartHidden
        }`}
      >
        <Cart onClose={() => setCartShown(false)} />
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
