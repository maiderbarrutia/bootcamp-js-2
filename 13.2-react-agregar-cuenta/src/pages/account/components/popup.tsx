import React from "react";
import styles from "./popup.module.css";

interface Props {
  message: string;
  onClose: () => void;
}

export const Popup: React.FC<Props> = ({ message, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <p>{message}</p>
        <button onClick={onClose}>Ok</button>
      </div>
    </div>
  );
};
