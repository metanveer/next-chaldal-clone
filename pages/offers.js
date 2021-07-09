import React from "react";
import Children from "../components/slug-page/Children";
import dbConnect from "../db/dbConnect";
import Product from "../models/productModel";

const OffersPage = ({ products }) => {
  return <Children type="products" variant="offer" products={products} />;
};

export async function getStaticProps() {
  await dbConnect();

  const products = await Product.find({
    OfferPictureUrls: { $exists: true, $not: { $size: 0 } },
  });

  const productsToJson = JSON.stringify(products);

  return {
    props: {
      products: JSON.parse(productsToJson),
    },
    revalidate: 3600,
  };
}

export default OffersPage;
