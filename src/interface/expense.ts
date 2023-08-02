export type Expense = {
  id: number
  title: string
  amount: number
  description: string
  createdAt?: Date
  updatedAt?: Date
}

export type ExpenseCreate = {
  title: string
  amount: number
  description: string
}

export type ExpenseUpdate = {
  id: number
  title: string
  amount: number
  description: string
}
