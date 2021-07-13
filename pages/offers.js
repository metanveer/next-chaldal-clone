import React from "react";
import Children from "../components/slug-page/Children";
import { fetchOffers } from "./api/Product/GetProductsOnOffer";
import dbConnect from "../db/dbConnect";
import Product from "../models/productModel";

const OffersPage = ({ products }) => {
  return <Children type="products" variant="offer" products={products} />;
};

export async function getStaticProps() {
  await dbConnect();
  const products = await fetchOffers(Product);

  return {
    props: {
      products,
    },
    revalidate: 3600,
  };
}

export default OffersPage;
