import React from "react";
import { FaFacebook } from "react-icons/fa";
import css from "./fb-login-btn.module.css";

const FbLoginBtn = ({ onLogin }) => {
  return (
    <button onClick={onLogin} className={css.fbBtn}>
      <div className={css.fbIcon}>
        <FaFacebook />
      </div>
      <div className={css.fbBtnText}>Log in With Facebook</div>
    </button>
  );
};

export default FbLoginBtn;
