import { useState } from "react";
import { AppLayout } from "@/layouts";
import styles from './acount.page.module.css'
import { useNavigate } from "react-router-dom";

import { NewAccountFormModel } from "./account.vm";
import { AccountForm } from "./components/account-form.component";
import { saveAccount } from "./api/account.api";
import { appRoutes } from "@/core/router";
import { mapAccountVmToApi } from "./account.mapper";
import { Popup } from "./components/popup";

export const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState<{message: string; onClose: () => void;} | null>(null);

  const handleCreateAccount = async (formValues: NewAccountFormModel) => {
    try {
      const newAccountApiInfo = mapAccountVmToApi(formValues);
      await saveAccount(newAccountApiInfo);
      setPopup({
        message: "Nueva cuenta creada con éxito.",
        onClose: () => {
          setPopup(null);
          navigate(appRoutes.accountList);
        },
      });
    } catch {
      setPopup({
        message: "Error al crear la cuenta. Por favor, inténtalo de nuevo.",
        onClose: () => setPopup(null),
      });
    }
  };


  return (
    <AppLayout>
    <div className={styles.container}>
      <h1 className={styles.title}>Cuenta Bancaria</h1>
      <AccountForm onCreateAccount={handleCreateAccount} />
    </div>
    {popup && (
        <Popup
          message={popup.message}
          onClose={popup.onClose || (() => setPopup(null))}
        />
      )}
    </AppLayout>
  )
};
