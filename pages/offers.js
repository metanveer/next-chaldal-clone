import React from "react";
import css from "../styles/offers.module.css";
import OfferCard from "../components/common/OfferCard";
import useGetOffers from "../hooks/useGetOffers";
import Loader from "../components/common/Loader";

const OffersPage = () => {
  const { data: products } = useGetOffers();

  return (
    <div className={css.childCategories}>
      {products ? (
        products.map((product) => (
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
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default OffersPage;
