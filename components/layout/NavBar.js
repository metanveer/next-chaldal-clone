import React, { Fragment } from "react";
import css from "./NavBar.module.css";
import { HiMenu } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";

import SearchBox from "../common/SearchBox";
import NavItem from "./NavItem";
import Link from "next/link";

const NavBar = ({ setModalShown, handleSideBar }) => {
  return (
    <>
      <div onClick={handleSideBar} className={css.menu}>
        <HiMenu />
      </div>
      <Link href="/">
        <a>
          <img
            className={css.logo}
            src="/logo-small.webp"
            alt="An egg with chaldal"
          />
        </a>
      </Link>
      <SearchBox />
      <Link href="/select-city">
        <a className={css.navItem}>
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
      <Link href="/customer/profile">
        <a className={css.navItem}>
          <span className={css.iconPrimary}>
            <FaUser />
          </span>
          <span className={css.navItemText}>{"Tanveer Hossain"}</span>
        </a>
      </Link>
      {/* <button className={css.btnSignIn}>Sign In</button> */}
    </>
  );
};

export default NavBar;
