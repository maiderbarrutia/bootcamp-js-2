export interface AccountVm {
  id: string;
  name: string;
}

export interface NewAccountFormModel {
  name: string;
  type: string;
}

export interface NewAccountValidationErrors {
  name: string;
  type: string;
}

export const createEmptyAccount = (): NewAccountFormModel => ({
  name: "",
  type: "",
});

export const createEmptyAccountValidationErrors = (): NewAccountValidationErrors => ({
  name: "",
  type: "",
});