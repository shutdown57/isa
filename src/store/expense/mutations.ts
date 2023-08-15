import { Expense } from 'src/interface/expense'
import { MutationTree } from 'vuex'
import { ExpenseStateInterface } from './state'

const mutation: MutationTree<ExpenseStateInterface> = {
  EXPENSES (state: ExpenseStateInterface, data: Array<Expense>): void {
    state.expenses = data
  },

  EXPENSE (state: ExpenseStateInterface, data: Expense): void {
    state.expense = data
  },

  COUNT (state: ExpenseStateInterface, data: number): void {
    state.count = data
  }
}

export default mutation
