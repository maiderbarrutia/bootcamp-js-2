import Axios from "axios";
import { Account } from "../models/account";

const urlAccounts = `${import.meta.env.VITE_BASE_API_URL}/accounts`;

export const getAccount = (accountId: string): Promise<Account[]> =>
  Axios.get<Account[]>(urlAccounts, { params: { accountId } }).then(
    ({ data }) => data
);