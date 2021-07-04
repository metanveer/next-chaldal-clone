import React, { useState } from "react";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import Modal from "./Modal";
import ProductDetail from "./ProductDetail";
import Button from "./Button";
import css from "./ProductCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  decreaseQty,
  increaseQty,
} from "../../features/cartItems/cartItemsSlice";
import { showCart } from "../../features/toggleCart/toggleCartSlice";

const ProductCard = ({
  cardType,
  id,
  itemName,
  image,
  images,
  packSize,
  regPrice,
  discPrice,
  description,
  slug,
}) => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cartItems);

  const [prevLocation, setPrevLocation] = useState(null);
  const [overlayShown, setOverlayShown] = useState(false);
  const [clickedId, setClickedId] = useState(null);

  const itemInCart = cartItems.find((cartItem) => cartItem.id === id);
  const isItemInCart = itemInCart !== undefined;

  const isDiscounted = discPrice < regPrice;
  const small = cardType === "small" ? css.productCardSmall : null;
  const hor = cardType === "horizontal" ? css.productCardHor : null;

  function handleCloseModal() {
    setClickedId(null);
    history.pushState({}, null, `${prevLocation}`);
  }

  function handleShowModal() {
    setClickedId(id);
    setPrevLocation(window.location.pathname);
    history.pushState({}, null, `/${slug}`);
  }

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
  }

  return (
    <div className={`${css.productCard} ${small} ${hor}`}>
      <div
        onMouseEnter={() => setOverlayShown(true)}
        onMouseLeave={() => setOverlayShown(false)}
        className={`${css.productCardContainer} ${
          hor && css.productCardContainerHor
        }`}
      >
        <div className={css.productCardImageWrapper}>
          <img className={css.productCardImage} src={image} alt={itemName} />
        </div>
        <div>
          <div className={css.productCardName}>{itemName}</div>
          <div className={css.productCardSubText}>{packSize}</div>
          <div className={css.productCardPriceContainer}>
            {isDiscounted ? (
              <>
                <span
                  className={css.productCardDiscPrice}
                >{`৳ ${discPrice}`}</span>
                <span className={css.productCardPrice}>{`৳ ${regPrice}`}</span>
              </>
            ) : (
              <span
                style={{ color: "inherit" }}
                className={css.productCardDiscPrice}
              >{`৳ ${regPrice}`}</span>
            )}
          </div>
        </div>
        {overlayShown && (
          <div className={css.productCardContainerOverlay}>
            <div className={css.overlayContent}>
              {!isItemInCart && (
                <div
                  onClick={handleAddItemToCart}
                  className={`${css.overlayTextAdd} ${
                    hor && css.overlayTextAddHor
                  }`}
                >
                  Add to Shopping Bag
                </div>
              )}
              {isItemInCart && (
                <>
                  <div
                    onClick={() => dispatch(increaseQty(itemInCart.id))}
                    className={`${css.overlayTextInBag} ${
                      hor && css.overlayTextInBagHor
                    }`}
                  >
                    <div
                      className={`${css.totalPriceInCart} ${
                        hor && css.totalPriceInCartHor
                      }`}
                    >
                      {`৳ ${itemInCart.qty * itemInCart.discPrice}`}
                    </div>

                    <div
                      className={`${css.qty} ${small && css.qtySmall} ${
                        hor && css.qtyHor
                      }`}
                    >
                      {itemInCart.qty}
                    </div>

                    <div className={css.inBag}>in bag</div>
                  </div>
                  <div
                    onClick={() => dispatch(decreaseQty(itemInCart.id))}
                    className={`${css.qtyBtn} ${css.btnLeft} ${
                      hor && css.qtyBtnHor
                    }`}
                  >
                    <FiMinusCircle />
                  </div>
                  <div
                    onClick={() => dispatch(increaseQty(itemInCart.id))}
                    className={`${css.qtyBtn} ${css.btnRight} ${
                      hor && css.qtyBtnHor
                    }`}
                  >
                    <FiPlusCircle />
                  </div>
                </>
              )}
            </div>
            <button
              onClick={handleShowModal}
              className={css.overlayButtonDetails}
            >
              Details {">"}
            </button>
          </div>
        )}
      </div>
      <Button
        onAddItemToCart={handleAddItemToCart}
        itemInCart={itemInCart}
        type="add-to-cart"
      />

      {clickedId === id && (
        <Modal modalWidth={980} onCloseModal={handleCloseModal}>
          <ProductDetail
            id={id}
            image={image}
            images={images}
            itemName={itemName}
            packSize={packSize}
            discPrice={discPrice}
            regPrice={regPrice}
            description={description}
            setClickedId={setClickedId}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductCard;
