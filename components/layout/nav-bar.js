import React, { useState } from "react";
import css from "./nav-bar.module.css";
import { HiMenu } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import { FiHelpCircle } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";
import SearchBox from "../common/search-box";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import UserMenu from "./user-menu";
import {
  hideModal,
  showModal,
} from "../../features/toggleModal/toggleModalSlice";
import Modal from "../common/modal";
import LoginForm from "../login/login-form";
import { useSession } from "next-auth/client";
import { useQuery } from "react-query";
import Loader from "../common/loader";
import { getUserProfile } from "../../utils/query-helpers";

const NavBar = ({ handleSideBar }) => {
  const [session] = useSession();
  const { modalShown, modalId } = useSelector((state) => state.toggleModal);
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(showModal("auth-modal"));
  };

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  const enableQuery = session ? true : false;

  const { isLoading, data } = useQuery("navbar", getUserProfile, {
    enabled: enableQuery,
    initialData: session?.user,
  });

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

        {session && <>{isLoading ? <Loader /> : <UserMenu user={data} />}</>}

        {!session && (
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
