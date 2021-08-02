import React, { useEffect, useState } from "react";
import styles from "./profile-form.module.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import Address from "./address";
import AddressForm from "./address-form";
import { getUserProfile, updateProfile } from "../../utils/query-helpers";
import Modal from "../common/modal";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  showModal,
} from "../../features/toggleModal/toggleModalSlice";

const ProfileForm = ({ user }) => {
  const [hasSeen, setHasSeen] = useState(true);

  const { modalShown, modalId } = useSelector((state) => state.toggleModal);
  const dispatch = useDispatch();

  function handleShowModal() {
    dispatch(showModal("add-new-address"));
  }
  function handleHideModal() {
    dispatch(hideModal());
  }

  const queryClient = useQueryClient();
  const { data: userProfile } = useQuery("profile", getUserProfile, {
    initialData: user,
  });

  const mutations = useMutation((data) => updateProfile(data), {
    onSuccess: (data) => {
      queryClient.setQueryData("profile", data);
      queryClient.setQueryData("navbar", data);
    },
  });

  const { error, isError, isLoading, isSuccess, mutateAsync } = mutations;

  const formik = useFormik({
    initialValues: {
      name: userProfile.name || "",
      phone: userProfile.phone || "",
      gender: userProfile.gender || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please provide a name"),
      phone: Yup.string().matches(
        /^(01[3-9]\d{8})$/g,
        "Please enter a valid bangladeshi number. e.g. 01672955886"
      ),
      gender: Yup.string().oneOf(
        ["male", "female", "thirdGender", "undisclosed"],
        "Please select from the options"
      ),
    }),
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    if (isSuccess) {
      let timer = setTimeout(() => {
        setHasSeen(false);
      }, 4000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isSuccess]);

  const {
    values,
    dirty,
    handleSubmit,
    getFieldProps,
    handleBlur,
    handleChange,
    touched,
    errors,
    resetForm,
  } = formik;

  async function handleFormSubmit() {
    setHasSeen(true);
    const result = await mutateAsync({
      name: values.name,
      phone: values.phone,
      gender: values.gender,
    });
    if (result) {
      resetForm({ values });
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Your Profile</h1>
        <form id="user-details-form" onSubmit={handleSubmit}>
          <fieldset className={styles.inputGroup}>
            <legend>Name</legend>
            <input
              className={styles.input}
              name="name"
              type="text"
              placeholder="My Name"
              disabled={isLoading}
              autoComplete="new-name"
              {...getFieldProps("name")}
            />
            {touched.name && errors.name ? (
              <div className={styles.error}>{errors.name}</div>
            ) : null}
          </fieldset>
          <fieldset className={styles.inputGroup}>
            <legend>Email</legend>
            <input
              className={styles.input}
              name="email"
              type="text"
              value={user.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="myemail@example.com"
              disabled
            />
            {touched.email && errors.email ? (
              <div className={styles.error}>{errors.email}</div>
            ) : null}
          </fieldset>
          <fieldset className={styles.inputGroup}>
            <legend>Phone</legend>
            <span className={styles.dialCode}>{"+88"}</span>
            <input
              className={`${styles.input} ${styles.phone}`}
              name="phone"
              type="text"
              placeholder="01712123456"
              disabled={isLoading}
              autoComplete="new-phone-number"
              {...getFieldProps("phone")}
            />
            {touched.phone && errors.phone ? (
              <div className={styles.error}>{errors.phone}</div>
            ) : null}
          </fieldset>
          <fieldset className={styles.inputGroup}>
            <legend>Gender</legend>
            <select
              name="gender"
              {...getFieldProps("gender")}
              className={styles.genderSelect}
            >
              <option value="" label="Select Gender">
                Select your gender
              </option>
              <option value="male" label="Male">
                Male
              </option>
              <option value="female" label="Female">
                Female
              </option>
              <option value="thirdGender" label="Third Gender">
                Third Gender
              </option>
              <option value="undisclosed" label="Prefer Not to Say">
                Prefer Not to Say
              </option>
            </select>
            {touched.gender && errors.gender ? (
              <div className={styles.error}>{errors.gender}</div>
            ) : null}
          </fieldset>

          {userProfile.addresses.length !== 0 && (
            <fieldset className={styles.inputGroup}>
              <legend>Address Book</legend>
              <button
                onClick={handleShowModal}
                className={styles.addNewAddress}
                type="button"
              >
                New Address
              </button>
              {userProfile.addresses.map(function (item, index) {
                return <Address key={index} item={item} />;
              })}
            </fieldset>
          )}
        </form>

        {userProfile.addresses.length === 0 && (
          <fieldset className={styles.inputGroup}>
            <legend>Address Book</legend>
            <AddressForm user={userProfile} newAddress />
          </fieldset>
        )}
        <div className={styles.status}>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div className={styles.errorForm}>
              {console.log("Error saving profile:", error)}
              {"Something unexpected happened while saving your profile!"}
            </div>
          ) : isSuccess && hasSeen ? (
            <div className={styles.formSuccess}>
              Profile updated successfully
            </div>
          ) : null}
        </div>
        {dirty && (
          <div className={styles.btnContainer}>
            <button
              className={styles.button}
              type="submit"
              disabled={isLoading || userProfile.addresses.length === 0}
              form="user-details-form"
            >
              {isLoading ? "Sending..." : "SAVE"}
            </button>
          </div>
        )}
      </div>
      {modalShown && modalId === "add-new-address" && (
        <Modal modalWidth={330} onCloseModal={handleHideModal} closeBtn>
          <AddressForm user={userProfile} />
        </Modal>
      )}
    </>
  );
};

export default ProfileForm;
