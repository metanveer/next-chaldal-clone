import React from "react";
import css from "./section.module.css";

const Section = ({ type, title, children }) => {
  if (type === "review") {
    return (
      <section className={css.sectionReview}>
        <span className={css.sectionTitle}>{title}</span>
        {children}
      </section>
    );
  }
  if (type === "category") {
    return (
      <section className={css.section}>
        <span className={css.sectionTitle}>{title}</span>
        <div className={css.categories}>{children}</div>
      </section>
    );
  }
  if (type === "features") {
    return (
      <section className={css.section}>
        <span className={css.sectionTitle}>
          Why People
          <img
            className={css.loveHeart}
            src="/people-love-chaldal/love-heart.svg"
            alt="love heart red"
          />
          Chaldal
        </span>
        {children}
      </section>
    );
  }
  return (
    <section className={css.section}>
      <span className={css.sectionTitle}>{title}</span>
      {children}
    </section>
  );
};

export default Section;
