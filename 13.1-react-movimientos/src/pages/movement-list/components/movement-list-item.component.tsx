import React from "react";
import { MovementVm } from "../movement-list.vm";
import styles from "./movement-list-item.component.module.css";

export const MovementListItemComponent: React.FC<{ movementItem: MovementVm }> = ({ movementItem }) => {
  return (
    <div className={`${styles.row}`}>

      <div className={styles.itemCell}>
        {movementItem.transaction.toLocaleDateString()}
      </div>

      <div className={styles.itemCell}>
        {movementItem.realTransaction.toLocaleDateString()}
      </div>

      <div className={styles.itemCell}>{movementItem.description}</div>

      <div className={`${styles.itemCell} ${styles.alignRight} ${movementItem.amount < 0 ? styles.negative : ""}`}>
        {movementItem.amount} €
      </div>

      <div className={`${styles.itemCell} ${styles.alignRight} ${movementItem.balance < 0 ? styles.negative : ""}`}>
        {movementItem.balance} €
      </div>

    </div>
  );
};
