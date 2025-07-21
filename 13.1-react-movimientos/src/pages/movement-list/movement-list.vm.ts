export interface AccountVm {
  id: string;
  iban: string;
  type: string;
  name: string;
  balance: number;
  lastTransaction: Date;
}

export interface MovementVm {
  id: string;
  description: string;
  amount: number;
  balance: number;
  transaction: Date;
  realTransaction: Date;
  accountId: string;
  
}