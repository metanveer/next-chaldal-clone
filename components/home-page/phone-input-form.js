import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import css from "./phone-input-form.module.css";

const PhoneInputForm = () => {
  const [phoneNum, setPhoneNum] = useState("");
  const [isActive, setIsActive] = useState(false);

  const border = `2px solid ${isActive ? "#ff686e" : "#eee"}`;

  const phoneStyle = {
    input: {
      backgroundColor: "#eee",
      borderRadius: "6px 0 0 6px",
      padding: "23px 20px 23px 40px",
      fontSize: "15px",
      width: "70%",
      borderTop: border,
      borderBottom: border,
      borderRight: "0",
      transition: "all 300ms ease-in-out",
    },
    button: {
      backgroundColor: "#eee",
      borderRight: "0px solid #eee",
      borderRadius: "6px 0 0 6px",
      padding: "0",
      margin: "0",
      borderTop: border,
      borderBottom: border,
      borderLeft: border,
      transition: "all 300ms ease-in-out",
    },
  };

  function handlePhoneNumSubmit(e) {
    e.preventDefault();
    console.log("Phone Number:", phoneNum);
  }

  return (
    <form onSubmit={handlePhoneNumSubmit} className={css.container}>
      <div className={css.phoneInput}>
        <PhoneInput
          country={"bd"}
          value={phoneNum}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          onChange={(phoneNum) => setPhoneNum(phoneNum)}
          disableDropdown={false}
          placeholder="+880 1715 234 567"
          buttonStyle={phoneStyle.button}
          inputStyle={phoneStyle.input}
        />
      </div>

      <button type="submit" className={css.button}>
        Get app
      </button>
    </form>
  );
};

export default PhoneInputForm;
