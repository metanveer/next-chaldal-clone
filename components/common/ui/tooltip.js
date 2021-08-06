import React from "react";
import styles from "./tooltip.module.css";

const ToolTip = ({ maxQty }) => {
  return (
    <>
      {maxQty && (
        <div className={styles.maxQtyToolTip}>
          <p>Your desired quantity is not available for this product</p>
        </div>
      )}
    </>
  );
};

export default ToolTip;
