import React from "react";
import dbConnect from "../../db/dbConnect";
import { setCategories } from "../../features/category/categorySlice";
import categoryModel from "../../models/categoryModel";
import { wrapper } from "../../store";
import css from "../../styles/search.module.css";

function SearchPage() {
  return (
    <div className={css.container}>
      <p className={css.heading}>
        {"Search for products (e.g. eggs, milk, potato)"}
      </p>
    </div>
  );
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await dbConnect();

  const categories = await categoryModel.find({});
  const categoriesToJson = JSON.stringify(categories);
  store.dispatch(setCategories(JSON.parse(categoriesToJson)));
});

export default SearchPage;
