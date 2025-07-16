import React from "react";
import { Movement } from "../../models/movement";
import styles from "./MovementTable.module.css";

interface Props {
  movements: Movement[];
}

const formatAmount = (amount: number) =>
  `${amount > 0 ? '' : '-'}${Math.abs(amount).toLocaleString("es-ES")} €`;

export const MovementsTable: React.FC<Props> = ({ movements }) => (
  <div className={styles["movements-table"]}>
    <div className={styles["movements-table__header"]}>
      <span>FECHA</span>
      <span>FECHA VALOR</span>
      <span>DESCRIPCIÓN</span>
      <span className={styles["movements-table__align-right"]}>IMPORTE</span>
      <span className={styles["movements-table__align-right"]}>SALDO DISPONIBLE</span>
    </div>
    {movements.map((mv) => (
      <div key={mv.id} className={styles["movements-table__row"]}>
        <span>{mv.date}</span>
        <span>{mv.valueDate}</span>
        <span>{mv.description}</span>
        <span
          className={`${styles["movements-table__align-right"]} ${
            mv.amount < 0 ? styles["movements-table__amount--negative"] : ""
          }`}
        >
          {formatAmount(mv.amount)}
        </span>
        <span className={styles["movements-table__align-right"]}>
          {mv.balance.toLocaleString("es-ES")} €
        </span>
      </div>
    ))}
  </div>
);



// import React from "react";
// import styles from "./MovementTable.module.css";
// import { Movement } from "../../models/movement";

// interface Props {
//   movements: Movement[];
// }

// const formatAmount = (amount: number) =>
//   `${amount > 0 ? "" : "-"}${Math.abs(amount)} €`;

// export const MovementsTable: React.FC<Props> = ({ movements }) => (
//   <div className={styles["movements-table"]}>
//     <table>
//       <thead className={styles["movements-table__thead"]}>
//         <tr>
//           <th className={styles["movements-table__th"]}>FECHA</th>
//           <th className={styles["movements-table__th"]}>FECHA VALOR</th>
//           <th className={styles["movements-table__th"]}>DESCRIPCIÓN</th>
//           <th className={styles["movements-table__th"]}>IMPORTE</th>
//           <th className={styles["movements-table__th"]}>SALDO DISPONIBLE</th>
//         </tr>
//       </thead>
//       <tbody>
//         {movements.map((mv, index) => (
//           <tr
//             key={mv.id}
//             className={index % 2 ? styles["movements-table__row--alt"] : ""}
//           >
//             <td className={styles["movements-table__td"]}>{mv.date}</td>
//             <td className={styles["movements-table__td"]}>{mv.valueDate}</td>
//             <td className={styles["movements-table__td"]}>{mv.description}</td>
//             <td
//               className={`${styles["movements-table__td"]}
//               ${styles["movements-table__td--right"]}
//               ${
//                 mv.amount < 0 ? styles["movements-table__amount--negative"] : ""
//               }`}
//             >
//               {formatAmount(mv.amount)}
//             </td>
//             <td className={`${styles["movements-table__td"]} ${styles["movements-table__td--right"]}`}>
//               {mv.balance} €
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// );
