import {
  mapAccountFromApiToVm,
  mapMovementListFromApiToVm,
} from "./movement-list.mapper";
import * as apiModel from "./api/movement-list.api-model";

describe("movement-list.mapper specs", () => {
  describe("mapAccountFromApiToVm", () => {
    it("should map an account correctly from API to ViewModel", () => {
      // Arrange
      const apiAccount: apiModel.Account = {
        id: "1",
        iban: "ES91 2100 0418 4502 0005 1332",
        type: "Corriente",
        name: "Mi cuenta",
        balance: 1500,
        lastTransaction: new Date("2023-08-01T10:00:00Z"),
      };

      // Act
      const result = mapAccountFromApiToVm(apiAccount);

      // Assert
      expect(result).toEqual({
        id: "1",
        iban: "ES91 2100 0418 4502 0005 1332",
        type: "Corriente",
        name: "Mi cuenta",
        balance: 1500,
        lastTransaction: new Date("2023-08-01T10:00:00Z"),
      });
    });
  });

  describe("mapMovementListFromApiToVm", () => {
    it("should map a list of movements correctly", () => {
      // Arrange
      const movementList: apiModel.Movement[] = [
        {
          id: "m1",
          accountId: "1",
          transaction: "2023-08-01T08:00:00Z",
          realTransaction: "2023-08-02T10:00:00Z",
          description: "Compra supermercado",
          amount: -45.5,
          balance: 1454.5,
        },
        {
          id: "m2",
          accountId: "1",
          transaction: "2023-08-03T08:00:00Z",
          realTransaction: "2023-08-04T10:00:00Z",
          description: "Nómina",
          amount: 2000,
          balance: 3454.5,
        },
      ];

      // Act
      const result = mapMovementListFromApiToVm(movementList);

      // Assert
      expect(result).toEqual([
        {
          id: "m1",
          accountId: "1",
          transaction: new Date("2023-08-01T08:00:00Z"),
          realTransaction: new Date("2023-08-02T10:00:00Z"),
          description: "Compra supermercado",
          amount: -45.5,
          balance: 1454.5,
        },
        {
          id: "m2",
          accountId: "1",
          transaction: new Date("2023-08-03T08:00:00Z"),
          realTransaction: new Date("2023-08-04T10:00:00Z"),
          description: "Nómina",
          amount: 2000,
          balance: 3454.5,
        },
      ]);
    });

    it("should return an empty array when movement list is empty", () => {
      // Act
      const result = mapMovementListFromApiToVm([]);

      // Assert
      expect(result).toEqual([]);
    });
  });
});
