import React, { Fragment, useState } from "react";
// import Login from "../../pages/Login/Login";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
// import Modal from "../UI/Modal";

import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const [modalShown, setModalShown] = useState(false);
  const [sidebarShown, setSidebarShown] = useState(true);

  return (
    <Fragment>
      {/* {modalShown && (
        <Modal handleCloseModal={() => setModalShown(false)}>
          <Login />
        </Modal>
      )} */}
      <nav className={styles.navBar}>
        <NavBar
          handleSideBar={() => setSidebarShown(!sidebarShown)}
          setModalShown={setModalShown}
        />
      </nav>

      <div className={sidebarShown ? styles.sideBar : styles.sideBarHide}>
        <SideBar />
      </div>

      <main className={sidebarShown ? styles.main : styles.mainExtended}>
        {children}
      </main>
    </Fragment>
  );
};

export default Layout;
