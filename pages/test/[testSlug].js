import React from "react";
import dbConnect from "../../db/dbConnect";
import { getCategoryBySlug } from "../api/category/[catSlug]";
import { getProductBySlug } from "../api/product/[prodSlug]";

const TestSlugPage = ({ name, product, category }) => {
  console.log("product", product);
  console.log("category", category);
  return <div>{name}</div>;
};

export async function getServerSideProps({ params }) {
  const name = params.testSlug;

  const client = await dbConnect();
  const Category = client.db().collection("categories");
  const Product = client.db().collection("products");

  const category = (await getCategoryBySlug(Category, name)) || {};

  const product = (await getProductBySlug(Product, name)) || {};

  //   const queryOptions = { AllCategoryIds: Number(category.Id) };
  //   const result = await getPaginatedDocs(Product, queryOptions, 1, 30);

  return {
    props: {
      name: name,
      product: JSON.parse(JSON.stringify(product)),
      category: JSON.parse(JSON.stringify(category)),
    },
  };
}

export default TestSlugPage;
