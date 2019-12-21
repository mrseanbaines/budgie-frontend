export enum Categories {
  General = 'general',
  EatingOut = 'eating_out',
  Expenses = 'expenses',
  Transport = 'transport',
  Bills = 'bills',
  Entertainment = 'entertainment',
  Shopping = 'shopping',
  Holidays = 'holidays',
  Groceries = 'groceries',
  PersonalCare = 'personal_care',
  Finances = 'finances',
  Family = 'family',
  Cash = 'cash',
}

export interface Merchant {
  name: string
}

export interface Counterparty {
  name: string
}

export interface Transaction {
  created: string
  id: string
  amount: number
  notes: string
  merchant: string | Merchant
  counterparty: Counterparty
  category: Categories
  include_in_spending: boolean
  is_load: boolean
}
