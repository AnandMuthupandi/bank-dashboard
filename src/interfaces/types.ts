export interface IData {
  id: string;
  card_type: string;
  balance: number;
}

export interface IGroupedData {
  card_type: string;
  values: number[];
}

export interface IClientAccounts {
  balance: number;
  card_type: string;
  created: string;
  id: string;
  number: number;
}
