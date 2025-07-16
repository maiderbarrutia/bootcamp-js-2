import React, { useEffect, useState } from "react";
import { BalanceHeader } from "../components/BalanceHeader/BalanceHeader";
import { MovementsTable } from "../components/MovementTable/MovementTable";
import { Account } from "../models/account";
import { Movement } from "../models/movement";


// import { accountMock } from "../mocks/account";
// import { movementsMock } from "../mocks/movements";
import { getAccount } from "../api/account";
import { getMovements } from "../api/movements";

export const Movimientos: React.FC = () => {
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
    <>
      <BalanceHeader account={account} />
      <MovementsTable movements={movements} />
    </>
  );
};
