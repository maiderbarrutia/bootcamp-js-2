import React from "react";
import { Account } from "../../models/account";
import styles from "./BalanceHeader.module.css";

export const BalanceHeader: React.FC<{ account: Account }> = ({ account }) => (
  <header className={styles["balance-header"]}>
    <div className={styles["balance-header__top"]}>
      <h1 className={styles["balance-header__title"]}>Saldos y Últimos movimientos</h1>
      <div className={styles["balance-header__balance-block"]}>
        <div className={styles["balance-header__balance-label"]}>Saldo disponible</div>
        <div className={styles["balance-header__balance-amount"]}>
          {account.balance} €
        </div>
      </div>
    </div>
    <div className={styles["balance-header__bottom"]}>
      <span className={styles["balance-header__alias"]}>Alias: {account.alias}</span>
      <span className={styles["balance-header__iban"]}>Iban: {account.iban}</span>
    </div>
  </header>
);
