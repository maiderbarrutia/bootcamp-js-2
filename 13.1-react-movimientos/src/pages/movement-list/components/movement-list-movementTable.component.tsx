import React from "react";
import { MovementVm } from "../movement-list.vm";
import { MovementListItemComponent } from "./movement-list-item.component";
import styles from "./movement-list-movementTable.component.module.css";

export const MovementsTable: React.FC<{movementList: MovementVm[]}> = ({ movementList }) => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.column}>Fecha</div>
        <div className={styles.column}>Fecha valor</div>
        <div className={styles.column}>Descripción</div>
        <div className={styles.column}>Importe</div>
        <div className={styles.column}>Saldo</div>
      </header>

      <div className={styles.body}>
        {movementList.map((movement) => (
          <MovementListItemComponent key={movement.id} movementItem={movement}/>
        ))}
      </div>
    </section>
  );
};