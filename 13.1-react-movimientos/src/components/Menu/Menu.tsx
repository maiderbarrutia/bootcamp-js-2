import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Menu.module.css";

export const Menu: React.FC = () => {
  return (
    <nav className={styles.menu}>
      <ul className={styles.menu__list}>
        <li className={styles.menu__item}>
          <NavLink
            to="/cuentas"
            className={({ isActive }) =>
              `${styles.menu__link} ${isActive ? styles["menu__item--active"] : ""}`
            }
          >
            Mis Cuentas
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink
            to="/movimientos"
            className={({ isActive }) =>
              `${styles.menu__link} ${isActive ? styles["menu__item--active"] : ""}`
            }
          >
            Movimientos
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink
            to="/transferencias"
            className={({ isActive }) =>
              `${styles.menu__link} ${isActive ? styles["menu__item--active"] : ""}`
            }
          >
            Transferencias
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

