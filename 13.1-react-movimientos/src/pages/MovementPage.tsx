import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { Menu } from "../components/Menu/Menu";
import { BalanceHeader } from "../components/BalanceHeader/BalanceHeader";
import { MovementsTable } from "../components/MovementTable/MovementTable";
import { Account } from "../models/account";
import { Movement } from "../models/movement";


// import { accountMock } from "../mocks/account";
// import { movementsMock } from "../mocks/movements";
import { getAccount } from "../api/account";
import { getMovements } from "../api/movements";

export const MovementsPage: React.FC = () => {
  // const [account] = useState<Account>(accountMock);
  // const [movements] = useState<Movement[]>(movementsMock);


  const [account, setAccount] = useState<Account | null>(null);
  const [movements, setMovements] = useState<Movement[]>([]);
  useEffect(() => {
    getAccount("1").then(accounts => {
      setAccount(accounts[0]);
    });
    getMovements("1").then(setMovements);
  }, []);

  if (!account) return <div>Cargando...</div>;

  return (
    <Layout>
      <div style={{ background: "#1fd5e4", padding: "20px", color: "#fff", display: "flex", alignItems: "center" }}>
        <img src="/logo.png" alt="AHBC logo" style={{ height: 54, marginRight: 32 }} />
        <div style={{ fontSize: 37, fontWeight: 700, letterSpacing: -2, lineHeight: 1, marginRight: 10 }}>AHBC</div>
        <div style={{ fontSize: 17, fontWeight: 400, marginBottom: 0, alignSelf: "flex-end" }}>online banking</div>
        <span style={{ flex: 1 }} />
        <div style={{ fontSize: 18 }}>Bienvenido</div>
      </div>
      <Menu />
      <div style={{ maxWidth: 1100, margin: "auto" }}>
        <BalanceHeader account={account} />
        <MovementsTable movements={movements} />
      </div>
    </Layout>
  );
};
