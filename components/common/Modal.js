import { Fragment } from "react";
import ReactDOM from "react-dom";
import { VscChromeClose } from "react-icons/vsc";

import css from "./Modal.module.css";

const Backdrop = ({ onCloseModal }) => {
  return <div className={css.backdrop} onClick={onCloseModal} />;
};

const ModalOverlay = ({ onCloseModal, children, modalWidth }) => {
  const widthStyle = {
    left: `calc(50vw - ${modalWidth}px / 2)`,
    width: `${modalWidth}px`,
  };

  return (
    <div style={widthStyle} className={css.modal}>
      <button onClick={onCloseModal} className={css.close}>
        <VscChromeClose />
      </button>
      <div className={css.content}>{children}</div>
    </div>
  );
};

const Modal = ({ onCloseModal, children, modalWidth }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={onCloseModal} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay modalWidth={modalWidth} onCloseModal={onCloseModal}>
          {children}
        </ModalOverlay>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
};

export default Modal;
