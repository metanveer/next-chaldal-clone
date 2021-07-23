import React from "react";
import css from "./nav-item.module.css";

const NavItem = ({
  setModalShown = undefined,
  iconPrimary,
  text,
  iconSecondary = null,
}) => {
  const handleLogin = () => {
    console.log("log in pop up");
    setModalShown(true);
  };

  return (
    <div className={css.navItem}>
      <div className={css.userIcon}>{iconPrimary}</div>
      <div className={css.userName}>{text}</div>
      {iconSecondary && (
        <div className={css.iconSecondary}>{iconSecondary}</div>
      )}
    </div>
  );
};

export default NavItem;
