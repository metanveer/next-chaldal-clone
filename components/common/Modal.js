import { Fragment } from "react";
import ReactDOM from "react-dom";
import { VscChromeClose } from "react-icons/vsc";

import css from "./Modal.module.css";

const Backdrop = ({ handleCloseModal }) => {
  return <div className={css.backdrop} onClick={handleCloseModal} />;
};

const ModalOverlay = ({ handleCloseModal, children, type }) => {
  const modalStyle = `${type === "product-detail" ? css.modalPD : css.modal}`;

  return (
    <div className={modalStyle}>
      <button onClick={handleCloseModal} className={css.close}>
        <VscChromeClose />
      </button>
      <div className={css.content}>{children}</div>
    </div>
  );
};

const Modal = ({ handleCloseModal, children, type }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop handleCloseModal={handleCloseModal} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay handleCloseModal={handleCloseModal} type={type}>
          {children}
        </ModalOverlay>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
};

export default Modal;
