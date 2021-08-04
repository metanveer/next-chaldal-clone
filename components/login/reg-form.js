import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { hideModal } from "../../features/toggleModal/toggleModalSlice";
import { createUser } from "../../utils/query-helpers";
import FlowerLoader from "../common/flower-loader";
import styles from "./login-form.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/dist/client/router";

const RegForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmedPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Too short password!")
        .required("Please enter a password"),
      confirmedPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password"), null], "Passwords didn't match!"),
    }),
    onSubmit: handleFormSubmit,
  });

  const { values, getFieldProps, handleSubmit, touched, errors } = formik;

  const mutation = useMutation((data) => createUser(data), {
    onSuccess: handleRegSuccess,
  });

  const { isLoading, isError, isSuccess, error, mutate } = mutation;

  async function handleRegSuccess() {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (!result.error) {
      router.replace("/food");
      dispatch(hideModal());
    }
    router.replace(`/error?type=login&message=${encodeURI(result.error)}`);
    dispatch(hideModal());
  }

  async function handleFormSubmit() {
    mutate({
      email: values.email,
      password: values.confirmedPassword,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          name="email"
          type="email"
          placeholder="Email address"
          disabled={isLoading}
          {...getFieldProps("email")}
        />

        {touched.email && errors.email ? (
          <div className={styles.error}>{errors.email}</div>
        ) : null}
      </div>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          name="password"
          type="password"
          placeholder="Password"
          disabled={isLoading}
          {...getFieldProps("password")}
        />
        {touched.password && errors.password ? (
          <div className={styles.error}>{errors.password}</div>
        ) : null}
      </div>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          name="confirmedPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm password"
          disabled={isLoading}
          {...getFieldProps("confirmedPassword")}
        />
        {touched.confirmedPassword && errors.confirmedPassword ? (
          <div className={styles.error}>{errors.confirmedPassword}</div>
        ) : null}
      </div>

      <div className={styles.status}>
        {isLoading ? (
          <FlowerLoader />
        ) : isError ? (
          <div className={styles.errorForm}>{error.message}</div>
        ) : isSuccess ? (
          <div className={styles.formSuccess}>User created successfully</div>
        ) : null}
      </div>
      <button className={styles.button} type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Create Account"}
      </button>
    </form>
  );
};

export default RegForm;
