import React from "react";
import { fetchOffers } from "./api/Product/GetProductsOnOffer";
import dbConnect from "../db/dbConnect";
import Product from "../models/productModel";
import css from "../styles/offers.module.css";
import OfferCard from "../components/common/OfferCard";

const OffersPage = ({ products }) => {
  return (
    <div className={css.childCategories}>
      {products.map((product) => (
        <div className={css.productCardWrapper} key={product._id}>
          <OfferCard
            id={product._id}
            itemName={product.NameWithoutSubText}
            image={product.PictureUrls[0]}
            offerImage={product.OfferPictureUrls[0]}
            images={product.PictureUrls}
            packSize={product.SubText}
            regPrice={product.Price.Lo}
            discPrice={product.DiscountedPrice.Lo}
            description={product.LongDescription}
            slug={product.Slug}
          />
        </div>
      ))}
    </div>
  );
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
