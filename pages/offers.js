import React from "react";
import Children from "../components/slug-page/Children";
import dbConnect from "../db/dbConnect";
import Product from "../models/productModel";

const OffersPage = ({ products }) => {
  const offerProducts = JSON.parse(products);
  return <Children type="products" variant="offer" products={offerProducts} />;
};

export async function getStaticProps() {
  await dbConnect();

  const productsFromDb = await Product.find({
    OfferPictureUrls: { $exists: true, $not: { $size: 0 } },
  });

  const products = JSON.stringify(productsFromDb);

  return {
    props: {
      products,
    },
    revalidate: 1000,
  };
}

export default OffersPage;
