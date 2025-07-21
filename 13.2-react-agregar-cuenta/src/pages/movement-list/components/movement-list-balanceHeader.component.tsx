import React from "react";
import { Account } from "../api/movement-list.api-model";
import styles from "./movement-list-balanceHeader.component.module.css";

export const BalanceHeader: React.FC<{ account: Account }> = ({ account }) => (
  <header className={styles.balanceHeader}>
    <div className={styles.balanceHeaderTop}>
      <h1 className={styles.balanceHeaderTitle}>Saldos y Últimos movimientos</h1>
      <div className={styles.balanceHeaderBalanceBlock}>
        <div className={styles.balanceHeaderBalanceLabel}>Saldo disponible</div>
        <div className={styles.balanceHeaderBalanceAmount}>
          {account.balance} €
        </div>
      </div>
    </div>
    <div className={styles.balanceHeaderBottom}>
      <span className={styles.balanceHeaderAlias}>Alias: {account.name}</span>
      <span className={styles.balanceHeaderIban}>Iban: {account.iban}</span>
    </div>
  </header>
);
