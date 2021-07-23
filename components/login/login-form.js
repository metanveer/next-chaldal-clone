import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import css from "./login-form.module.css";
import { useRouter } from "next/dist/client/router";
import { hideModal } from "../../features/toggleModal/toggleModalSlice";
import { useDispatch } from "react-redux";
import FbLoginBtn from "../common/fb-login-btn";

async function createUser(email, password) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: handleFormSubmit,
  });
  console.log("formik", formik);

  const {
    setSubmitting,
    status,
    setStatus,
    handleSubmit,
    getFieldProps,
    touched,
    errors,
    isSubmitting,
    isValidating,
  } = formik;

  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (isValidating) {
      setStatus("");
    }
  }, [isValidating]);

  const switchLoginMode = () => {
    setStatus("");
    setIsLogin((prevState) => !prevState);
  };

  async function handleFormSubmit(values) {
    try {
      setSubmitting(true);
      setStatus("Submitting data...");

      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        if (!result.error) {
          setStatus("Success!");
          router.replace("/food");
          dispatch(hideModal());
        } else {
          setStatus(result.error);
        }
      } else {
        try {
          const result = await createUser(values.email, values.password);
          if (result.message === "User created!") {
            setStatus("User created! Please sign in to continue...");
          } else {
            setStatus(result.message);
          }
        } catch (error) {
          setStatus(result.message);
          console.log(error);
        }
      }

      setSubmitting(false);
    } catch (error) {
      console.log("error from login page", error);
    }
  }

  const fbLoginHandler = async () => {
    const res = await signIn("facebook");

    console.log("res fb", res);
  };

  return (
    <div className={css.container}>
      {isLogin && <FbLoginBtn onLogin={fbLoginHandler} />}
      <form onSubmit={handleSubmit}>
        <div className={css.inputGroup}>
          <input
            className={css.input}
            name="email"
            type="email"
            placeholder="Email address"
            {...getFieldProps("email")}
          />

          {touched.email && errors.email ? (
            <div className={css.error}>{errors.email}</div>
          ) : null}
        </div>
        <div className={css.inputGroup}>
          <input
            className={css.input}
            name="password"
            type="password"
            placeholder="Password"
            {...getFieldProps("password")}
          />
          {touched.password && errors.password ? (
            <div className={css.error}>{errors.password}</div>
          ) : null}
        </div>

        <div className={css.status}>{status}</div>
        <button className={css.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            "Please wait..."
          ) : (
            <>{isLogin ? "Sign In" : "Create Account"}</>
          )}
        </button>
        <div className={css.formFooter}>
          {isLogin && (
            <>
              New here?{" "}
              <span onClick={switchLoginMode}>Please create an account</span>
            </>
          )}
          {!isLogin && (
            <>
              Got an account?{" "}
              <span onClick={switchLoginMode}>Please sign in</span>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
