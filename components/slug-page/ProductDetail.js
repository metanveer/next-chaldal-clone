import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/Ai";
import Footer from "../common/Footer";
import PicturesMagnify from "./PicturesMagnify";
import css from "./ProductDetail.module.css";

function getDiscPercent(price, discPric) {
  return (((price - discPric) / price) * 100).toFixed();
}

const ProductDetail = ({ product }) => {
  const discPercent = getDiscPercent(
    product.Price.Lo,
    product.DiscountedPrice.Lo
  );

  return (
    <div className={css.productDetailWrapper}>
      <div className={css.productDetail}>
        <div className={css.leftSec}>
          <PicturesMagnify pictureUrls={product.PictureUrls} />
        </div>
        <div className={css.rightSec}>
          <div className={css.name}>{product.NameWithoutSubText}</div>
          <div className={css.subText}>{product.SubText}</div>
          <div className={css.priceSec}>
            <div className={css.priceWrapper}>
              <div className={css.discPrice}>৳{product.DiscountedPrice.Lo}</div>
              {discPercent > 0 && (
                <div className={css.price}>{`MRP ৳${product.Price.Lo}`}</div>
              )}
            </div>
            {discPercent > 0 && (
              <div className={css.percentOff}>{discPercent}% OFF</div>
            )}
          </div>
          <div className={css.changeQtySec}>
            <div className={css.changeQtyWrapper}>
              <button className={css.changeQtyBtn}>
                <AiOutlineMinus />
              </button>
              <div className={css.changeQtyTextContainer}>
                <div className={css.qty}>1</div>
                <span className={css.inBag}>in bag</span>
              </div>
              <button className={css.changeQtyBtn}>
                <AiOutlinePlus />
              </button>
            </div>
            <button className={css.btnBuyNow}>Buy Now</button>
          </div>
          <div className={css.devider} />
          <p className={css.productDescription}>{product.LongDescription}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
