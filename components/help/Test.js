import React from "react";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";

import chaldalCategories from "../../data/chaldalCategories.json";

import css from "./Test.module.css";

const apiV2 = "https://eggyolk.chaldal.com/api/Category/GetAllCategories";

// const urlWithProxy = `https://cors-anywhere.herokuapp.com/${apiV2}`;

// const fetcher = (url) => axios.get(url).then((res) => res.data);

function Test() {
  // const { data, error } = useSWR(urlWithProxy, fetcher);

  // console.log(data);

  // console.log(chaldalCategories);

  //   const ctgs = JSON.stringify(chaldalCategories);

  return (
    <>
      <div className={css.header}>
        <div className={css.testHeader}>
          <div className={css.cellHeader}>Cat ID</div>
          <div className={css.cellHeader}>Name</div>
          <div className={css.cellHeader}>Parent Cat ID</div>
          <div className={css.cellHeader}>Display Order</div>
          <div className={css.cellHeader}>Contains Product</div>
          <div className={css.cellHeader}>Cat Type</div>
          <div className={css.cellHeader}>Image</div>
        </div>
      </div>

      {chaldalCategories.map((item) => (
        <div key={item.Id} className={css.test}>
          <div className={css.cell}>{item.Id}</div>
          <div className={css.cell}>{item.Name}</div>
          <div className={css.cell}>{item.ParentCategoryId}</div>
          <div className={css.cell}>{item.DisplayOrder}</div>
          <div className={css.cell}>{item.ContainsProducts ? "Yes" : "No"}</div>
          <div className={css.cell}>{item.CategoryType}</div>
          {/* {console.dir(
            item.Picture ? item.Picture.ImageUrl : "No image assigned"
          )} */}
          <div className={css.cell}>
            {item.Picture ? (
              <img src={item.Picture.ImageUrl} alt={item.Name} />
            ) : (
              "No image"
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default Test;
