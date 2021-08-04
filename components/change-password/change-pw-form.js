import { useFormik } from "formik";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { changePassword } from "../../utils/query-helpers";
import FlowerLoader from "../common/flower-loader";
import styles from "./change-pw-form.module.css";

const ChangePasswordForm = () => {
  const mutation = useMutation((data) => changePassword(data));

  const { isLoading, isError, isSuccess, error, mutateAsync } = mutation;

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmedPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Please provide your old password"),
      newPassword: Yup.string()
        .min(6, "Password must be min 6 characters long")
        .required("Please type your new password"),
      confirmedPassword: Yup.string()
        .required("Please confirm your new password")
        .oneOf([Yup.ref("newPassword"), null], "New passwords didn't match!"),
    }),
    onSubmit: handleFormSubmit,
  });

  const { values, getFieldProps, handleSubmit, touched, errors, resetForm } =
    formik;

  async function handleFormSubmit() {
    const result = await mutateAsync({
      oldPassword: values.oldPassword,
      newConfirmedPassword: values.confirmedPassword,
    });
    if (result.message) {
      resetForm();
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Change your password</h1>

      <div className={styles.status}>
        {isLoading ? (
          <FlowerLoader />
        ) : isError ? (
          <div className={styles.errorForm}>{error.message}</div>
        ) : isSuccess ? (
          <div className={styles.formSuccess}>
            Password updated successfully
          </div>
        ) : null}
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <fieldset className={styles.inputGroup}>
          <legend className={styles.label} htmlFor="old-password">
            Old Password
          </legend>
          <input
            className={styles.input}
            name="oldPassword"
            type="password"
            autoComplete="new-password"
            disabled={isLoading}
            {...getFieldProps("oldPassword")}
          />
          {touched.oldPassword && errors.oldPassword ? (
            <div className={styles.error}>{errors.oldPassword}</div>
          ) : null}
        </fieldset>
        <fieldset className={styles.inputGroup}>
          <legend className={styles.label} htmlFor="new-password">
            New Password
          </legend>
          <input
            className={styles.input}
            name="newPassword"
            type="password"
            autoComplete="new-password"
            disabled={isLoading}
            {...getFieldProps("newPassword")}
          />
          {touched.newPassword && errors.newPassword ? (
            <div className={styles.error}>{errors.newPassword}</div>
          ) : null}
        </fieldset>
        <fieldset className={styles.inputGroup}>
          <legend className={styles.label} htmlFor="confirm-password">
            Confirm New Password
          </legend>
          <input
            className={styles.input}
            name="confirmedPassword"
            type="password"
            autoComplete="new-password"
            disabled={isLoading}
            {...getFieldProps("confirmedPassword")}
          />
          {touched.confirmedPassword && errors.confirmedPassword ? (
            <div className={styles.error}>{errors.confirmedPassword}</div>
          ) : null}
        </fieldset>
        <div className={styles.btnContainer}>
          <button disabled={isLoading} className={styles.button} type="submit">
            {isLoading ? (
              <div>
                {" "}
                <FlowerLoader /> <span>Checking...</span>
              </div>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
