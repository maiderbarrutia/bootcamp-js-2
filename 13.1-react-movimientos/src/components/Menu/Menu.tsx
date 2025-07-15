import React from "react";

export const Menu: React.FC = () => (
  <nav style={{
    background: "#242d3c",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    fontWeight: 500,
    letterSpacing: "0.5px"
  }}>
    <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
      <li style={{ padding: "16px 32px" }}>Mis Cuentas</li>
      <li style={{
        padding: "16px 32px",
        borderBottom: "4px solid #25d5ed"
      }}>Movimientos</li>
      <li style={{ padding: "16px 32px" }}>Transferencias</li>
    </ul>
  </nav>
);
