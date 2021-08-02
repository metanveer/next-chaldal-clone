import React, { useEffect, useRef } from "react";
import Select from "react-select";
import useAddress from "../../hooks/useAddress";
import styles from "./dropdown-select.module.css";

const DropdownSelect = ({
  name,
  onSelect,
  onSelectBlur,
  value,
  error: fieldError,
  touched,
  label,
  parentId,
  instanceId,
}) => {
  const { isLoading, data, isError, error } = useAddress(`${name}s`, parentId);

  const isMounted = useRef(false);

  const customStyles = {
    control: (provided, state) => {
      return {
        ...provided,
        border: state.isFocused ? "1px solid red" : "1px solid #cccccc",
        boxShadow: "none",

        "&:hover": {
          boxShadow: "none",
        },
      };
    },
    indicatorSeparator: (provided) => {
      return {
        ...provided,
        width: 0,
      };
    },
  };

  useEffect(() => {
    if (isMounted.current) {
      onSelect(name, "");
    } else {
      isMounted.current = true;
    }
  }, [parentId]);

  const handleChange = (value) => {
    onSelect(name, value);
  };

  return (
    <>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <Select
        instanceId={instanceId}
        className={styles.container}
        styles={customStyles}
        onChange={handleChange}
        onBlur={() => onSelectBlur(name, true)}
        value={value}
        name={name}
        isDisabled={!data}
        options={data && data}
      />
      {touched && fieldError ? (
        <div className={styles.error}>{fieldError}</div>
      ) : null}
    </>
  );
};

export default DropdownSelect;
