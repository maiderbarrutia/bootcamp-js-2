import React from "react";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles["movements-header"]}>
        <div className={styles["movements-header__title-group"]}>
            <div className={styles["movements-header__title"]}>AHBC</div>
            <div className={styles["movements-header__subtitle"]}>online banking</div>
        </div>
        <div className={styles["movements-header__welcome"]}>Bienvenido</div>
    </header>
  );
};