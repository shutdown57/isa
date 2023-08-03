import { Expense } from 'src/interface/expense'

export interface ExpenseStateInterface {
  expenses: Array<Expense>
  expense?: Expense,
  count: number
}

function state (): ExpenseStateInterface {
  return {
    expenses: [] as Array<Expense>,
    expense: {} as Expense,
    count: 0 as number
  }
}

export default state
