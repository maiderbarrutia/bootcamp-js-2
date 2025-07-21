import { AccountVm, NewAccountFormModel } from "./account.vm";
import { AccountAPIModel, NewAccountAPIModel } from "./api/account.api-model";

export const mapAccountApiToVm = (apiAccount: AccountAPIModel): AccountVm => ({
  id: apiAccount.id,
  name: apiAccount.name,
});

export const mapAccountVmToApi = (vmAccount: NewAccountFormModel): NewAccountAPIModel => ({
  name: vmAccount.name,
  type: vmAccount.type,
});
