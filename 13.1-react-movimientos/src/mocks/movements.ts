import { Movement } from "../models/movement";

export const movementsMock: Movement[] = [
  {
    id: "1",
    accountId: "1",
    date: "09/12/2019",
    valueDate: "09/12/2019",
    description: "Nómina noviembre",
    amount: 900,
    balance: 1490,
  },
  {
    id: "2",
    accountId: "1",
    date: "07/12/2019",
    valueDate: "08/12/2019",
    description: "Alquiler noviembre",
    amount: -400,
    balance: 590,
  },
  {
    id: "3",
    accountId: "1",
    date: "01/12/2019",
    valueDate: "02/12/2019",
    description: "Gastos móvil",
    amount: -24,
    balance: 990,
  },
];