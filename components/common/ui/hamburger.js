import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  showModal,
} from "../../../features/toggleModal/toggleModalSlice";
import SideBar from "../../layout/side-bar";
import Modal from "../modal";
import styles from "./hamburger.module.css";

const Hamburger = () => {
  const dispatch = useDispatch();
  const { modalShown, modalId } = useSelector((state) => state.toggleModal);

  const toggled = modalShown && modalId === "sidebar-modal";

  function handleShowSideBar() {
    dispatch(showModal("sidebar-modal"));

    if (toggled) {
      dispatch(hideModal());
    }
  }

  function handleHideModal() {
    dispatch(hideModal());
  }

  return (
    <>
      <div onClick={handleShowSideBar} className={styles.hamburger}>
        <div className={`${styles.bar} ${toggled && styles.bar1}`}></div>
        <div className={`${styles.bar} ${toggled && styles.bar2}`}></div>
        <div className={`${styles.bar} ${toggled && styles.bar3}`}></div>
      </div>
      {modalShown && modalId === "sidebar-modal" && (
        <Modal onCloseModal={handleHideModal} sidebar>
          <SideBar />
        </Modal>
      )}
    </>
  );
};

export default Hamburger;
