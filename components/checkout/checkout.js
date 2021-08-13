import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../features/cart/cartSlice";
import {
  hideModal,
  showModal,
} from "../../features/toggleModal/toggleModalSlice";
import decimalWithCommas from "../../utils/decimal-with-commas";
import { createOrder, getUserProfile } from "../../utils/query-helpers";
import FlowerLoader from "../common/flower-loader";
import Modal from "../common/modal";
import Address from "../user-profile/address";
import AddressForm from "../user-profile/address-form";
import styles from "./checkout.module.css";

const Checkout = ({ user }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    items,
    totalItemsPriceDisc,
    deliveryChargeReg,
    promoDeliveryCharge,
    isPromoApply,
  } = useSelector((state) => state.cart);

  const { modalShown, modalId } = useSelector((state) => state.toggleModal);
  const { data: userProfile } = useQuery("profile", getUserProfile, {
    initialData: user,
  });
  const [selectedAddress, setSelectedAddress] = useState(
    userProfile?.addresses[0]
  );
  const [selectorShown, setSelectorShown] = useState(false);

  const totalOrderPrice = isPromoApply
    ? totalItemsPriceDisc + promoDeliveryCharge
    : totalItemsPriceDisc + deliveryChargeReg;

  const mutation = useMutation((data) => createOrder(data), {
    onSuccess: handleOrderCreateSuccess,
  });
  const { isLoading, isError, mutate, data: mutateResponse } = mutation;

  function handleOrderCreateSuccess() {
    dispatch(resetCart());
  }

  const deliveryCharge = isPromoApply ? promoDeliveryCharge : deliveryChargeReg;

  const handleSelectedAddress = (item) => {
    setSelectedAddress(item);
    setSelectorShown(false);
  };

  const handleChangeAddress = () => {
    setSelectorShown(true);
  };

  function handleShowModal() {
    dispatch(showModal("new-address-at-checkout"));
  }
  function handleHideModal() {
    dispatch(hideModal());
  }

  function handleOrderProceed() {
    console.log({
      deliveryAddress: selectedAddress,
      products: items,
      shippingFee: deliveryCharge,
      totalOrderPrice: totalOrderPrice,
    });

    mutate({
      deliveryAddress: selectedAddress,
      products: items,
      shippingFee: deliveryCharge,
      totalOrderPrice: totalOrderPrice,
    });
  }

  const hasAddress = userProfile?.addresses?.length !== 0;
  const addressLength = userProfile?.addresses?.length;

  console.log("hasAddress", hasAddress);

  useEffect(() => {
    if (addressLength === 1) {
      setSelectedAddress(userProfile.addresses[0]);
    }
  }, [addressLength]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Checkout</p>
      <address className={styles.addressSelectorContainer}>
        <div className={styles.addressSelectorHeading}>
          <span className={styles.locationIcon}>
            <IoLocationSharp />
          </span>
          <span className={styles.headingText}>
            {selectedAddress && !selectorShown
              ? "Delivery Address"
              : "Select a Delivery Address"}
          </span>
          {selectedAddress && !selectorShown ? (
            <button
              onClick={handleChangeAddress}
              className={styles.btnChangeAddress}
              type="button"
            >
              Change
            </button>
          ) : null}
        </div>
        <div className={styles.addressContainer}>
          {selectorShown ? (
            <>
              {hasAddress ? (
                <>
                  <button
                    onClick={handleShowModal}
                    className={styles.addNewAddress}
                    type="button"
                  >
                    New Address
                  </button>
                  {userProfile.addresses.map(function (item, index) {
                    return (
                      <Address
                        key={index}
                        item={item}
                        checkout
                        onSelect={() => handleSelectedAddress(item)}
                        selectedId={selectedAddress?._id}
                      />
                    );
                  })}
                </>
              ) : (
                <AddressForm user={userProfile} firstAddress />
              )}
            </>
          ) : (
            <>
              {selectedAddress ? (
                <Address item={selectedAddress} selected />
              ) : (
                <AddressForm user={userProfile} firstAddress />
              )}
            </>
          )}

          {modalShown && modalId === "new-address-at-checkout" && (
            <Modal modalWidth={330} onCloseModal={handleHideModal} closeBtn>
              <AddressForm user={userProfile} />
            </Modal>
          )}
        </div>
      </address>
      <div className={styles.bag}></div>
      <p className={styles.paymentText}>
        Payment options are available on next page
      </p>
      <div className={styles.btnProceedContainer}>
        <p className={styles.deliveryCharge}>
          {`৳`} {deliveryCharge} Delivery charge included
        </p>
        <button onClick={handleOrderProceed} className={styles.btnPlaceOrder}>
          {isLoading ? (
            <FlowerLoader />
          ) : (
            <>
              <span className={styles.placeOrderText}>Proceed</span>
              <span className={styles.orderAmount}>
                <span className={styles.takaSign}>{`৳`}</span>
                {decimalWithCommas(totalOrderPrice)}
              </span>
            </>
          )}
        </button>
        <p className={styles.termsAgreement}></p>
      </div>
    </div>
  );
};

export default Checkout;
