import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/Ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  decreaseQty,
  setItemSeenStatus,
} from "../../features/cartItems/cartItemsSlice";
import { showCart } from "../../features/toggleCart/toggleCartSlice";
import Footer from "./main-footer";
import PicturesMagnify from "./pictures-magnify";
import css from "./product-detail.module.css";

function getDiscPercent(price, discPric) {
  return (((price - discPric) / price) * 100).toFixed();
}

const ProductDetail = ({
  id,
  image,
  images,
  itemName,
  packSize,
  discPrice,
  regPrice,
  description,
  modalShownId,
  onHideModal,
}) => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cartItems);
  const { cartShown } = useSelector((state) => state.toggleCart);

  const itemInCart = cartItems.find((cartItem) => cartItem.id === id);
  const isItemInCart = itemInCart !== undefined;

  const discPercent = getDiscPercent(regPrice, discPrice);

  function handleAddItemToCart() {
    dispatch(
      addItemToCart({
        packSize,
        image,
        itemName,
        discPrice,
        regPrice,
        id,
      })
    );
    if (cartItems.length === 0) dispatch(showCart());
    dispatch(setItemSeenStatus({ id: id, cartStatus: cartShown }));
  }

  function handleBuyNow() {
    dispatch(
      addItemToCart({
        packSize,
        image,
        itemName,
        discPrice,
        regPrice,
        id,
      })
    );
    modalShownId && onHideModal(null);
    cartItems.length === 0 && dispatch(showCart());
    dispatch(setItemSeenStatus({ id: id, cartStatus: cartShown }));
  }

  function handleDecreaseQty() {
    if (!itemInCart) return;
    dispatch(decreaseQty(id));
    dispatch(setItemSeenStatus({ id: id, cartStatus: cartShown }));
  }

  return (
    <div className={css.productDetailWrapper}>
      <div className={css.productDetail}>
        <div className={css.leftSec}>
          <PicturesMagnify pictureUrls={images} />
        </div>
        <div className={css.rightSec}>
          <div className={css.name}>{itemName}</div>
          <div className={css.subText}>{packSize}</div>
          <div className={css.priceSec}>
            <div className={css.priceWrapper}>
              <div className={css.discPrice}>৳{discPrice}</div>
              {discPercent > 0 && (
                <div className={css.price}>{`MRP ৳${regPrice}`}</div>
              )}
            </div>
            {discPercent > 0 && (
              <div className={css.percentOff}>{discPercent}% OFF</div>
            )}
          </div>
          <div className={css.changeQtySec}>
            <div className={css.changeQtyWrapper}>
              <button onClick={handleDecreaseQty} className={css.changeQtyBtn}>
                <AiOutlineMinus />
              </button>
              <div className={css.changeQtyTextContainer}>
                <div className={css.qty}>
                  {isItemInCart ? itemInCart.qty : 0}
                </div>
                <span className={css.inBag}>in bag</span>
              </div>
              <button
                onClick={handleAddItemToCart}
                className={css.changeQtyBtn}
              >
                <AiOutlinePlus />
              </button>
            </div>
            <button onClick={handleBuyNow} className={css.btnBuyNow}>
              Buy Now
            </button>
          </div>
          <div className={css.devider} />
          <p className={css.productDescription}>{description}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;