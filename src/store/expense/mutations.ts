import { Expense } from 'src/interface/expense'
import { MutationTree } from 'vuex'
import { ExpenseStateInterface } from './state'

const mutation: MutationTree<ExpenseStateInterface> = {
  EXPENSES (state: ExpenseStateInterface, data: Array<Expense>) {
    state.expenses = data
  },

  EXPENSE (state: ExpenseStateInterface, data: Expense) {
    state.expense = data
  },

  COUNT (state: ExpenseStateInterface, data: number) {
    state.count = data
  }
}

export default mutation
