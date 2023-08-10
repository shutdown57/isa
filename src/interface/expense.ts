export type Expense = {
  id: number
  title: string
  amount: number
  description: string
  accountId: number
  createdAt?: Date
  updatedAt?: Date
}

export type ExpenseCreate = {
  title: string
  amount: number
  description: string
  accountId: number
}

export type ExpenseUpdate = {
  id: number
  title: string
  amount: number
  description: string
}

export type ExpenseDelete = {
  id: number
  amount: number
  accountId: number
}
