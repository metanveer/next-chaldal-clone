import React, { useEffect } from "react";
import { signIn } from "next-auth/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import css from "./login-form.module.css";
import { useRouter } from "next/dist/client/router";
import { hideModal } from "../../features/toggleModal/toggleModalSlice";
import { useDispatch } from "react-redux";
import FbLoginBtn from "../common/fb-login-btn";
import FlowerLoader from "../common/flower-loader";

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

  const router = useRouter();

  useEffect(() => {
    if (isValidating) {
      setStatus("");
    }
    //eslint-disable-next-line
  }, [isValidating]);

  async function handleFormSubmit(values) {
    try {
      setSubmitting(true);
      setStatus("Submitting data...");

      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (!result.error) {
        setStatus("Success!");
        router.replace("/food");
        dispatch(hideModal());
      }
      setSubmitting(false);
      setStatus(result.error);
    } catch (error) {
      setStatus("Unexpected error occured while signing in!");
      console.log("error from login page", error);
    }
  }

  return (
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
          <span>
            <FlowerLoader color="white" />
          </span>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
