import React from "react";
import {
  NewAccountFormModel,
  NewAccountValidationErrors,
  createEmptyAccount,
  createEmptyAccountValidationErrors,
} from "../account.vm";
import { validateForm } from "../account.validation";
import styles from "./account-form.component.module.css";

const accountTypes = ["Corriente", "Ahorro", "Nómina", "Inversión"];

interface Props {
  onCreateAccount: (account: NewAccountFormModel) => void;
}

export const AccountForm: React.FC<Props> = ({ onCreateAccount }) => {
  const [account, setAccount] = React.useState<NewAccountFormModel>(createEmptyAccount());
  const [errors, setErrors] = React.useState<NewAccountValidationErrors>(createEmptyAccountValidationErrors());

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const updatedAccount = {
      ...account,
      [name]: value,
    };

    setAccount(updatedAccount);

    const validationResult = validateForm(updatedAccount);
    setErrors(validationResult.errors);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = validateForm(account);
    setErrors(validationResult.errors);

    if (validationResult.succeeded) {
      onCreateAccount(account);
      setAccount(createEmptyAccount());
      setErrors(createEmptyAccountValidationErrors());
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <div className={styles.group}>
          <label htmlFor="type" className={styles.label}>Tipo de cuenta:</label>
          <select
            id="type"
            name="type"
            value={account.type}
            onChange={handleFieldChange}
            className={`${styles.select} ${errors.type ? styles.inputError : ""}`}
          >
            <option value="">Seleccionar</option>
            {accountTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.type && <p className={styles.error}>{errors.type}</p>}
        </div>

        <div className={styles.group}>
          <label htmlFor="name" className={styles.label}>
            Alias:
          </label>
          <input
            id="name"
            name="name"
            value={account.name}
            onChange={handleFieldChange}
            className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
      </div>

      <div className={styles.buttonContent}>
        <button type="submit" className={styles.button}>
          GUARDAR
        </button>
      </div>
    </form>
  );
};
