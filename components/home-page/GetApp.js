import React from "react";
import StoreBadges from "../common/StoreBadges";
import css from "./GetApp.module.css";
import PhoneInputForm from "./PhoneInputForm";

const GetApp = () => {
  return (
    <section className={css.sectionGetApp}>
      <div className={css.leftContent}>
        <div className={css.title}>Be a part of our family</div>
        <PhoneInputForm />
        <StoreBadges />
      </div>
      <div className={css.rightContent}>
        <img
          className={css.mobileAppPreview}
          src="/get-app/mobile_app_preview.webp"
          alt="Chaldal mobile app screen shot"
        />
      </div>
    </section>
  );
};

export default GetApp;
