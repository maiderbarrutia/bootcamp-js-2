export interface MovementVM {
  date: string;
  valueDate: string;
  description: string;
  amount: string;    // Ej: "+900 €", "-400 €"
  balance: string;   // Ej: "1.490 €"
  isNegative: boolean;
}