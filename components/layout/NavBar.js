import React, { Fragment, useState, useEffect } from "react";
import css from "./NavBar.module.css";
import { HiMenu } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";
import SearchBox from "../common/SearchBox";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import {
  hideModal,
  showModal,
} from "../../features/toggleModal/toggleModalSlice";
import Modal from "../common/Modal";
import LoginForm from "../login/LoginForm";

const NavBar = ({ handleSideBar }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { modalShown, modalId } = useSelector((state) => state.toggleModal);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleSignIn = () => {
    dispatch(showModal("auth-modal"));
  };

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  return (
    <>
      <nav className={css.navbar}>
        <button onClick={handleSideBar} className={css.menu}>
          <HiMenu />
        </button>
        <Link href="/">
          <a>
            <img
              className={css.logo}
              src="/logo-small.webp"
              alt="An egg with chaldal"
            />
          </a>
        </Link>
        <div className={css.searchbox}>
          <SearchBox />
        </div>
        <Link href="/select-city">
          <a className={css.location}>
            <span className={css.iconPrimary}>
              <GoLocation />
            </span>
            <span className={css.navItemText}>Dhaka</span>
            <span className={css.iconSecondary}>
              <HiChevronDown />
            </span>
          </a>
        </Link>
        <Link href="/t/help">
          <a className={css.navItem}>
            <span className={css.iconPrimary}>
              <FiHelpCircle />
            </span>
            <span className={css.navItemText}>{"Help & More"}</span>
          </a>
        </Link>

        <span className={css.localeWrapper}>
          <div
            className={css.localeEn}
            // className={css.activeLocale}
          >
            EN
          </div>
          <div className={css.divider}>|</div>
          <div className={css.localeBn}>বাং</div>
        </span>

        {currentUser && <UserMenu user={currentUser} />}

        {!currentUser && (
          <button onClick={handleSignIn} className={css.btnSignIn}>
            Sign In
          </button>
        )}
      </nav>
      {modalShown && modalId === "auth-modal" && (
        <Modal modalWidth={340} onCloseModal={handleCloseModal}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default NavBar;
