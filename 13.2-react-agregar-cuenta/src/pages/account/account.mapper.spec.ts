import { mapAccountVmToApi } from "./account.mapper";
import * as apiModel from "./api/account.api-model";
import * as viewModel from "./account.vm";

describe("account.mapper specs", () => {
  it("should map NewAccountFormModel to NewAccountAPIModel with same name and type", () => {
    // Arrange
    const vmAccount: viewModel.NewAccountFormModel = {
      name: "Mi alias",
      type: "Corriente",
    };

    const expectedApiAccount: apiModel.NewAccountAPIModel = {
      name: "Mi alias",
      type: "Corriente",
    };

    // Act
    const result: apiModel.NewAccountAPIModel = mapAccountVmToApi(vmAccount);

    // Assert
    expect(result).toEqual(expectedApiAccount);
  });
});
