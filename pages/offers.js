import React from "react";
import ProductCard from "../components/common/ProductCard";
import Children from "../components/slug-page/Children";
import productsData from "../data/__data__Popular_products.json";

const OffersPage = ({ offerProducts }) => {
  return <Children type="products" variant="offer" products={offerProducts} />;
};

export async function getStaticProps() {
  const offerProducts =
    productsData.filter((item) => item.OfferPictureUrls.length > 0) || [];

  console.log("offers", offerProducts.length);

  return {
    props: {
      offerProducts: offerProducts,
    },
    revalidate: 1000,
  };
}

export default OffersPage;
