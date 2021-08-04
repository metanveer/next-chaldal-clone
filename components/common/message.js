import React from "react";
import styles from "./message.module.css";

const Message = ({ error, title, info, text }) => {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${error && styles.error}`}>{title}</h1>

      <h3 className={styles.info}>{info}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Message;
