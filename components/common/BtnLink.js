import React from "react";
import Link from "next/link";
import css from "./BtnLink.module.css";

const BtnLink = ({ to, children }) => {
  return (
    <Link href={to}>
      <a className={css.btnLink}>{children}</a>
    </Link>
  );
};

export default BtnLink;
