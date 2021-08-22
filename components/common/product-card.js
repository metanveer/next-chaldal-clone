import React, { useState } from "react";
import Highlighter from "react-highlight-words";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import Modal from "./modal";
import ProductDetail from "./product-detail";
import Button from "./button";
import css from "./product-card.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  decreaseQty,
  setItemSeenStatus,
} from "../../features/cart/cartSlice";
import { showCart } from "../../features/toggleCart/toggleCartSlice";
import decimalWithCommas from "../../utils/decimal-with-commas";
import ToolTip from "./ui/tooltip";

const ProductCard = ({
  cardType,
  id,
  itemName,
  searchWords = [],
  image,
  images,
  packSize,
  regPrice,
  discPrice,
  description,
  slug,
  stock,
}) => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const { cartShown } = useSelector((state) => state.toggleCart);

  const [prevLocation, setPrevLocation] = useState(null);
  const [overlayShown, setOverlayShown] = useState(false);
  const [clickedId, setClickedId] = useState(null);
  const [showTooltip, setShowTootip] = useState(false);

  const itemInCart = cartItems.find((cartItem) => cartItem._id === id);

  const isItemInCart = itemInCart !== undefined;
  const isStockOut = stock === 0;
  const maxQtyReached = itemInCart?.qty === stock;

  const isDiscounted = discPrice < regPrice;
  const small = cardType === "small";
  const hor = cardType === "horizontal";

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
    if (maxQtyReached) {
      setShowTootip(true);
      return;
    }
    setShowTootip(false);
    dispatch(
      addItemToCart({
        packSize,
        image,
        itemName,
        discPrice,
        regPrice,
        id,
        hasVisited: cartShown,
      })
    );
    if (cartItems.length === 0) dispatch(showCart());
    dispatch(setItemSeenStatus({ _id: id, cartStatus: cartShown }));
  }

  function handleDecreaseQty() {
    dispatch(decreaseQty(itemInCart._id));
    dispatch(setItemSeenStatus({ _id: id, cartStatus: cartShown }));
  }

  const className = small
    ? css.productCardSmall
    : hor
    ? css.productCardHor
    : css.productCard;

  return (
    <div className={`${className}`}>
      <div
        onMouseEnter={() => setOverlayShown(true)}
        onMouseLeave={() => setOverlayShown(false)}
        className={`${css.productCardContainer} ${
          hor && css.productCardContainerHor
        } ${isStockOut && css.stockOutWrap}`}
      >
        <div className={css.productCardImageWrapper}>
          <img className={css.productCardImage} src={image} alt={itemName} />
        </div>
        <div>
          <div className={css.productCardName}>
            <Highlighter
              highlightClassName={css.highlighted}
              searchWords={searchWords}
              autoEscape={true}
              textToHighlight={itemName}
            />
          </div>
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
              {isStockOut ? (
                <div
                  className={`${css.overlayTextAddStockOut} ${
                    hor && css.overlayTextAddHor
                  }`}
                >
                  OUT OF STOCK
                </div>
              ) : !isItemInCart ? (
                <div
                  onClick={handleAddItemToCart}
                  className={`${css.overlayTextAdd} ${
                    hor && css.overlayTextAddHor
                  }`}
                >
                  {`Add to Shopping Bag (${stock})`}
                </div>
              ) : (
                <>
                  <div
                    onClick={handleAddItemToCart}
                    className={`${css.overlayTextInBag} ${
                      hor && css.overlayTextInBagHor
                    }`}
                  >
                    <div
                      className={`${css.totalPriceInCart} ${
                        hor && css.totalPriceInCartHor
                      }`}
                    >
                      {`৳ ${decimalWithCommas(
                        itemInCart.qty * itemInCart.discPrice
                      )}`}
                    </div>

                    <div
                      className={`${css.qty} ${small && css.qtySmall} ${
                        hor && css.qtyHor
                      }`}
                    >
                      {itemInCart.qty}
                    </div>

                    <div className={css.inBag}>in bag{` (${stock})`}</div>
                  </div>
                  <div
                    onClick={handleDecreaseQty}
                    className={`${css.qtyBtn} ${css.btnLeft} ${
                      hor && css.qtyBtnHor
                    }`}
                  >
                    <FiMinusCircle />
                  </div>
                  {maxQtyReached ? null : (
                    <div
                      onClick={handleAddItemToCart}
                      className={`${css.qtyBtn} ${css.btnRight} ${
                        hor && css.qtyBtnHor
                      }`}
                    >
                      <FiPlusCircle />
                    </div>
                  )}
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
        {itemInCart ? (
          <>{maxQtyReached && showTooltip ? <ToolTip maxQty /> : null}</>
        ) : null}
      </div>
      <Button
        btnType="add-to-cart"
        stock={stock}
        onIncreaseQty={handleAddItemToCart}
        onDecreaseQty={handleDecreaseQty}
        itemInCart={itemInCart}
      />

      {clickedId === id && (
        <Modal modalWidth={980} closeBtn onCloseModal={handleCloseModal}>
          <ProductDetail
            id={id}
            image={image}
            images={images}
            itemName={itemName}
            packSize={packSize}
            discPrice={discPrice}
            regPrice={regPrice}
            description={description}
            stock={stock}
            modalShownId={clickedId}
            onHideModal={setClickedId}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductCard;
