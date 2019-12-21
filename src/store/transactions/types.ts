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
  category: string | null
  include_in_spending: boolean
  is_load: boolean
}
