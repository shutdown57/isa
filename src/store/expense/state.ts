import { Expense } from 'src/interface/expense'

export interface ExpenseStateInterface {
  expenses: Array<Expense>
  expense?: Expense
}

function state (): ExpenseStateInterface {
  return {
    expenses: [] as Array<Expense>,
    expense: {} as Expense
  }
}

export default state
