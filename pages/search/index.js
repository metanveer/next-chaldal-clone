import React from "react";
import css from "./index.module.css";

function SearchPage() {
  return (
    <div className={css.container}>
      <p className={css.heading}>
        {"Search for products (e.g. eggs, milk, potato)"}
      </p>
    </div>
  );
}

export default SearchPage;
