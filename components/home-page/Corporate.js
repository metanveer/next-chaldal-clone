import React from "react";
import css from "./corporate.module.css";
import { FiCheck } from "react-icons/fi";
import Link from "next/link";

const features = [
  {
    icon: "/corporate/cash_taka.svg",
    text: "Special Corporate Prices",
  },
  {
    icon: "/corporate/call_center.svg",
    text: "24 Hour Support",
  },
  {
    icon: "/corporate/delivery.svg",
    text: "Flexible Free Delivery",
  },
];

const CorpFeature = ({ icon, feature }) => {
  return (
    <div className={css.corpFeatureContainer}>
      <div className={css.tick}>
        <FiCheck />
      </div>
      <img className={css.icon} src={icon} alt={feature} />
      <div className={css.feature}>{feature}</div>
    </div>
  );
};

const Corporate = () => {
  return (
    <section className={css.corporate}>
      <img
        className={css.icon}
        src="/corporate/office_bag.svg"
        alt="Office Bag"
      />
      <div className={css.corporateTitle}>Do you own a business ?</div>
      <div className={css.corporateSubTitle}>Become a Corporate Customer</div>
      <div className={css.featuresWrapper}>
        {features.map((feature) => (
          <CorpFeature
            key={feature.text}
            icon={feature.icon}
            feature={feature.text}
          />
        ))}
      </div>
      <Link href="/corporate">
        <a className={css.btnLink}>FIND OUT MORE</a>
      </Link>
    </section>
  );
};

export default Corporate;
