import {
  NewAccountFormModel,
  NewAccountValidationErrors,
  createEmptyAccountValidationErrors,
} from "./account.vm";

interface ValidationResult {
  succeeded: boolean;
  errors: NewAccountValidationErrors;
}

export const validateForm = (account: NewAccountFormModel): ValidationResult => {
  let validationResult = {
    succeeded: true,
    errors: createEmptyAccountValidationErrors(),
  };

  if (!account.name.trim()) {
    validationResult.errors = {
      ...validationResult.errors,
      name: "Debe introducir un alias",
    };
    validationResult.succeeded = false;
  }

  if (!account.type.trim()) {
    validationResult.errors = {
      ...validationResult.errors,
      type: "Debe elegir un tipo de cuenta",
    };
    validationResult.succeeded = false;
  }

  return validationResult;
};
