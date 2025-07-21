export interface Account {
  id: string;
  iban: string;
  type: string;
  name: string;
  balance: number;
  lastTransaction: Date;
}

export interface Movement {
  id: string;
  description: string;
  amount: number;
  balance: number;
  transaction: string;
  realTransaction: string;
  accountId: string;
  
}