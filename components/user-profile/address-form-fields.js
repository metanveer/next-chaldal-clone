import React from "react";
import styles from "./address-form-fields.module.css";
import DropdownSelect from "./dropdown-select";

const AddressFormFields = ({ formik }) => {
  return (
    <>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          className={styles.input}
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          autoComplete="new-name"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className={styles.error}>{formik.errors.name}</div>
        ) : null}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="phone">
          Phone Number
        </label>
        <div className={styles.phoneInputWrapper}>
          <span className={styles.dialCode}>+88</span>
          <input
            className={`${styles.input} ${styles.phone}`}
            name="phone"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            autoComplete="new-phone-number"
          />
        </div>

        {formik.touched.phone && formik.errors.phone ? (
          <div className={styles.error}>{formik.errors.phone}</div>
        ) : null}
      </div>

      <div className={styles.inputGroup}>
        <DropdownSelect
          name="division"
          instanceId="instanceIdforDivisions"
          label="Region"
          onSelect={formik.setFieldValue}
          onSelectBlur={formik.setFieldTouched}
          value={formik.values.division}
          error={formik.errors.division}
          touched={formik.touched.division}
          parentId="whatEver"
        />
      </div>
      <div className={styles.inputGroup}>
        <DropdownSelect
          name="district"
          instanceId="instanceIdForDistricts"
          label="City"
          onSelect={formik.setFieldValue}
          onSelectBlur={formik.setFieldTouched}
          value={formik.values.district}
          error={formik.errors.district}
          touched={formik.touched.district}
          parentId={formik.values.division?.value}
        />
      </div>
      <div className={styles.inputGroup}>
        <DropdownSelect
          name="upazila"
          instanceId="instanceIdForUpazilas"
          label="Upazila"
          onSelect={formik.setFieldValue}
          onSelectBlur={formik.setFieldTouched}
          value={formik.values.upazila}
          error={formik.errors.upazila}
          touched={formik.touched.upazila}
          parentId={formik.values.district?.value}
        />
      </div>
      <div className={styles.inputGroup}>
        <DropdownSelect
          name="union"
          instanceId="instanceIdForUnions"
          label="Area"
          onSelect={formik.setFieldValue}
          onSelectBlur={formik.setFieldTouched}
          value={formik.values.union}
          error={formik.errors.union}
          touched={formik.touched.union}
          parentId={formik.values.upazila?.value}
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="address">
          Address
        </label>
        <textarea
          className={styles.input}
          name="address"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows="3"
          value={formik.values.address}
          placeholder="Road / House / Ward / Village"
          autoComplete="new-address"
        />
        {formik.touched.address && formik.errors.address ? (
          <div className={styles.error}>{formik.errors.address}</div>
        ) : null}
      </div>
    </>
  );
};

export default AddressFormFields;
