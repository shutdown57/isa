import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ExpenseStateInterface } from './state'

const getters: GetterTree<ExpenseStateInterface, StateInterface> = {
  expenses: context => context.expenses,
  expense: context => context.expense
}

export default getters
