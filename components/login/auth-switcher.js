import { signIn } from "next-auth/client";
import React, { useState } from "react";
import FbLoginBtn from "../common/fb-login-btn";
import styles from "./auth-switcher.module.css";
import LoginForm from "./login-form";
import RegForm from "./reg-form";

const AuthSwitcher = () => {
  const [loginState, setLoginState] = useState(true);

  const fbLoginHandler = () => {
    signIn("facebook");
  };

  return (
    <div className={styles.container}>
      {loginState ? <LoginForm /> : <RegForm />}

      <div className={styles.border} />
      {!loginState && (
        <>
          <button
            className={`${styles.button} ${styles.btnSecSignIn}`}
            onClick={() => setLoginState(true)}
          >
            Login With Existing Account
          </button>
        </>
      )}
      {loginState && (
        <>
          <FbLoginBtn onLogin={fbLoginHandler} />
          <button
            className={`${styles.button} ${styles.btnSecCreatNew}`}
            onClick={() => setLoginState(false)}
          >
            Create New Account
          </button>
        </>
      )}
    </div>
  );
};

export default AuthSwitcher;
