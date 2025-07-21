import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BalanceHeader } from "./components/movement-list-balanceHeader.component";
import { MovementsTable } from "./components/movement-list-movementTable.component";

import { getAccount, getMovements } from "./api/movement-list.api";
import { AppLayout } from "@/layouts";
import { AccountVm, MovementVm } from "./movement-list.vm";
import { mapAccountFromApiToVm, mapMovementListFromApiToVm } from "./movement-list.mapper";

export const MovementListPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [account, setAccount] = useState<AccountVm | null>(null);
  const [movements, setMovements] = useState<MovementVm[] | null>(null);

  useEffect(() => {
    if (id) {
      getAccount(id).then((result) => {
        
        setAccount(mapAccountFromApiToVm(result))
    });
      getMovements(id).then((result) => {
        setMovements(mapMovementListFromApiToVm(result))
      });
    }
  }, [id]);

  return (
    <AppLayout>
      {account && movements ? (
    <>
      <BalanceHeader account={account} />
      <MovementsTable movementList={movements} />
    </>
  ) : (
    <p>Cargando información...</p>
  )}
  </AppLayout>
  );
};

