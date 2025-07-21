import { NewAccountFormModel } from "./account.vm";
import { validateForm } from "./account.validation";

describe("account.validation specs", () => {
  it("Should return validation succeeded when both fields are informed", () => {
    // Arrange
    const account: NewAccountFormModel = {
      name: "Mi alias",
      type: "Corriente",
    };

    // Act
    const result = validateForm(account);

    // Assert
    expect(result.succeeded).toBeTruthy();
    expect(result.errors.name).toEqual("");
    expect(result.errors.type).toEqual("");
  });

  it("Should return validation failed when name is empty", () => {
    // Arrange
    const account: NewAccountFormModel = {
      name: "",
      type: "Ahorro",
    };

    // Act
    const result = validateForm(account);

    // Assert
    expect(result.succeeded).toBeFalsy();
    expect(result.errors.name).toEqual("Debe introducir un alias");
    expect(result.errors.type).toEqual("");
  });

  it("Should return validation failed when type is empty", () => {
    // Arrange
    const account: NewAccountFormModel = {
      name: "Mi alias",
      type: "",
    };

    // Act
    const result = validateForm(account);

    // Assert
    expect(result.succeeded).toBeFalsy();
    expect(result.errors.name).toEqual("");
    expect(result.errors.type).toEqual("Debe elegir un tipo de cuenta");
  });

  it("Should return validation failed when both name and type are empty", () => {
    // Arrange
    const account: NewAccountFormModel = {
      name: "",
      type: "",
    };

    // Act
    const result = validateForm(account);

    // Assert
    expect(result.succeeded).toBeFalsy();
    expect(result.errors.name).toEqual("Debe introducir un alias");
    expect(result.errors.type).toEqual("Debe elegir un tipo de cuenta");
  });
});
