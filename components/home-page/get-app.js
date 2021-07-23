import React from "react";
import StoreBadges from "../common/store-badges";
import css from "./get-app.module.css";
import PhoneInputForm from "./phone-input-form";

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
