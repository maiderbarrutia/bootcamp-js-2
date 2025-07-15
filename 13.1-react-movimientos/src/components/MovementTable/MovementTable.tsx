import React from "react";
import { Movement } from "../../models/movement";

interface Props {
  movements: Movement[];
}
const formatAmount = (amount: number) =>
  `${amount > 0 ? '' : '-'}${Math.abs(amount).toLocaleString("es-ES")} €`;

export const MovementsTable: React.FC<Props> = ({ movements }) => (
  <table style={{
    width: "100%",
    background: "#fff",
    borderRadius: 8,
    margin: "2rem 0",
    borderCollapse: "collapse",
    fontSize: "1.1rem"
  }}>
    <thead>
      <tr>
        <th style={thStyle}>FECHA</th>
        <th style={thStyle}>FECHA VALOR</th>
        <th style={thStyle}>DESCRIPCIÓN</th>
        <th style={thStyle}>IMPORTE</th>
        <th style={thStyle}>SALDO DISPONIBLE</th>
      </tr>
    </thead>
    <tbody>
      {movements.map((mv, index) => (
        <tr key={mv.id} style={index % 2 ? trAlt : {}}>
          <td style={tdStyle}>{mv.date}</td>
          <td style={tdStyle}>{mv.valueDate}</td>
          <td style={tdStyle}>{mv.description}</td>
          <td style={{
            ...tdStyle,
            color: mv.amount < 0 ? "#c00" : "inherit",
            fontWeight: 500
          }}>
            {formatAmount(mv.amount)}
          </td>
          <td style={tdStyle}>
            {mv.balance.toLocaleString("es-ES")} €
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const thStyle = {
  background: "#e5eaee",
  borderBottom: "2px solid #ccc",
  padding: "8px 16px",
  textAlign: "left" as const,
  fontWeight: 700 as const
};
const tdStyle = {
  padding: "8px 16px",
  borderBottom: "1px solid #ececec"
};
const trAlt = {
  background: "#f8f8f8"
};
