import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  showModal,
} from "../../features/toggleModal/toggleModalSlice";
import Modal from "../common/modal";
import AddressForm from "./address-form";
import css from "./address.module.css";

const Address = ({ item }) => {
  const dispatch = useDispatch();
  const { modalShown, modalId } = useSelector((state) => state.toggleModal);

  function handleShowModal() {
    dispatch(showModal(item._id));
  }
  function handleHideModal() {
    dispatch(hideModal());
  }

  const name = item.name;
  const phone = item.phone;
  const division = item.division.label;
  const city = item.district.label;
  const upazila = item.upazila.label;
  const area = item.union.label;
  const address = item.address;

  return (
    <>
      <address className={css.container}>
        <button type="button" onClick={handleShowModal} className={css.btnEdit}>
          Edit
        </button>
        <div className={css.namePhoneWrapper}>
          <div className={css.name}>{name}</div>
          <div className={css.phone}>Phone: {phone}</div>
        </div>
        <div className={css.address}>{address}</div>
        <div className={css.areaCityWrapper}>
          <span className={css.area}>{area}</span>
          <span className={css.area}>{upazila}</span>
          <span className={css.area}>{city}</span>
          <span className={css.city}>{division}</span>
        </div>
      </address>
      {modalShown && modalId === item._id && (
        <Modal modalWidth={330} onCloseModal={handleHideModal} closeBtn>
          <AddressForm item={item} />
        </Modal>
      )}
    </>
  );
};

export default Address;
