import React from "react";
import css from "./nav-bar.module.css";
import { HiMenu } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import { FiHelpCircle } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";
import SearchBox from "../common/search-box";
import Link from "next/link";
import UserMenu from "./user-menu";
import Hamburger from "../common/ui/hamburger";

const NavBar = ({ handleSideBar }) => {
  return (
    <nav className={css.navbar}>
      <div className={css.hamburgerMenuIcon}>
        <Hamburger />
      </div>
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
      <UserMenu />
    </nav>
  );
};

export default NavBar;
