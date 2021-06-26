import React from "react";
import Test from "../../components/help/Test";
import Card from "../../components/common/Card";

import categoriesData from "../../data/chaldalCategories.json";

const HelpPage = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* This is a help page */}
      <Card
        type="category"
        name={categoriesData[6].Name}
        image={categoriesData[6].Picture.ImageUrl}
      />
      <Card
        type="product"
        name={categoriesData[6].Name}
        image={categoriesData[6].Picture.ImageUrl}
      />
      {/* <Test /> */}
    </div>
  );
};

export default HelpPage;
