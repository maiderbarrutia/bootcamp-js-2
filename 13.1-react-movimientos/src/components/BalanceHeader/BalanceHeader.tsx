import React from "react";
import { Account } from "../../models/account";

interface Props {
  account: Account;
}

export const BalanceHeader: React.FC<Props> = ({ account }) => (
  <header style={{ background: "#fff", padding: "32px" }}>
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: "0.5rem",
    }}>
      <h1 style={{ fontSize: "2.1rem", margin: 0, fontWeight: 500 }}>Saldos y Últimos movimientos</h1>
      <div>
        <div style={{
          textAlign: "right",
          fontWeight: "bold",
          fontSize: "1.1rem"
        }}>SALDO DISPONIBLE</div>
        <div style={{
          color: "#00ad74",
          fontWeight: 700,
          fontSize: "2rem"
        }}>
          {account.balance.toLocaleString("es-ES")} €
        </div>
      </div>
    </div>
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "4px solid #000",
      alignItems: "center",
      paddingBottom: "10px"
    }}>
      <span><strong>Alias:</strong> {account.alias}</span>
      <span style={{ fontWeight: "bold" }}>
        IBAN: {account.iban}
      </span>
    </div>
  </header>
);
