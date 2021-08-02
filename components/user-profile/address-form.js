import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./address-form.module.css";
import { modifyAddress } from "../../utils/query-helpers";
import { useMutation, useQueryClient } from "react-query";
import AddressFormFields from "./address-form-fields";

const AddressForm = ({ item, newAddress }) => {
  const queryClient = useQueryClient();

  const mutations = useMutation((data) => modifyAddress(data), {
    onSuccess: (data) => {
      queryClient.setQueryData("profile", data);
    },
  });

  const userData = queryClient.getQueryData("profile");

  const { error, isError, isLoading, isSuccess, mutate, mutateAsync } =
    mutations;

  const formik = useFormik({
    initialValues: {
      name: newAddress && userData.name ? userData.name : item ? item.name : "",
      phone:
        newAddress && userData.phone ? userData.phone : item ? item.phone : "",
      division: item?.division || { value: "", label: "" },
      district: item?.district || { value: "", label: "" },
      upazila: item?.upazila || { value: "", label: "" },
      union: item?.union || { value: "", label: "" },
      address: item?.address || "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Please provide a name"),
      phone: Yup.string().matches(
        /^(01[3-9]\d{8})$/g,
        "Please enter a valid bangladeshi number. e.g. 01672955886"
      ),
      division: Yup.object().required("Please select your region"),
      district: Yup.object().required("Please select your city"),
      upazila: Yup.object().required("Please specify upazila"),
      union: Yup.object().required("Choose your area"),
      address: Yup.string().required(
        "Please provide address e.g. House #19/1, Road #6, Dhanmondi R/A, 12046"
      ),
    }),

    onSubmit: async (values) => {
      const result = await mutateAsync({
        addressId: item?._id,
        addressData: values,
      });

      if (result) {
        formik.resetForm({ values });
      }
    },
  });

  const deleteAddress = async (id) => {
    mutate({
      addressId: id,
    });
  };

  return (
    <div className={`${styles.container} ${newAddress && styles.newContainer}`}>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.title}>
          {item
            ? "Edit Address"
            : `${newAddress ? "Confirm your address" : "New Address"}`}
        </div>
        <AddressFormFields formik={formik} />
        <div className={styles.status}>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div className={styles.errorForm}>
              {console.log("Error saving address:", error)}
              {"Something unexpected happened while saving the address!"}
            </div>
          ) : isSuccess ? (
            <div className={styles.formSuccess}>Address saved successfully</div>
          ) : null}
        </div>

        <div className={styles.btnContainer}>
          <button
            disabled={isLoading}
            className={`${styles.button} ${newAddress && styles.newBtn}`}
            type="submit"
          >
            {item ? "Save" : `${newAddress ? "Confirm" : "Add"}`}
          </button>
          {!newAddress && (
            <button
              onClick={() => deleteAddress(item._id)}
              disabled={!item}
              className={`${styles.button} ${styles.btnDel}`}
              type="button"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
