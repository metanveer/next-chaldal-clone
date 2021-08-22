import { Fragment } from "react";
import ReactDOM from "react-dom";
import { VscChromeClose } from "react-icons/vsc";

import css from "./modal.module.css";

const Backdrop = ({ onCloseModal, sidebar }) => {
  return (
    <div
      className={`${css.backdrop} ${sidebar && css.backdropSidebar}`}
      onClick={onCloseModal}
    />
  );
};

const ModalOverlay = ({
  onCloseModal,
  children,
  modalWidth,
  closeBtn,
  sidebar,
}) => {
  const widthStyle = {
    left: `calc(50vw - ${modalWidth}px / 2)`,
    width: `${modalWidth}px`,
  };

  return (
    <div
      style={widthStyle}
      className={`${css.modal} ${sidebar && css.modalSidebar}`}
    >
      {closeBtn && (
        <button onClick={onCloseModal} className={css.close}>
          <VscChromeClose />
        </button>
      )}
      <div className={css.content}>{children}</div>
    </div>
  );
};

const Modal = ({ onCloseModal, children, modalWidth, closeBtn, sidebar }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={onCloseModal} sidebar={sidebar} />,
        document.getElementById("overlays")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          modalWidth={modalWidth}
          closeBtn={closeBtn}
          onCloseModal={onCloseModal}
          sidebar={sidebar}
        >
          {children}
        </ModalOverlay>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
};

export default Modal;
