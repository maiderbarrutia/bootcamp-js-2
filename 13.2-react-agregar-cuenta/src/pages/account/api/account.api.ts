import Axios from "axios";
import { AccountAPIModel , NewAccountAPIModel } from "./account.api-model";

const url =  `${import.meta.env.VITE_BASE_API_URL}/account-list`;

export const getAccount = (account: AccountAPIModel ): Promise<AccountAPIModel > =>
  Axios.post<AccountAPIModel >(url, account).then(({ data }) => data);

export const saveAccount = (account: NewAccountAPIModel): Promise<NewAccountAPIModel> =>
  Axios.post<NewAccountAPIModel>(url, account).then(({ data }) => data);