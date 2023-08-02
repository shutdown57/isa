import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { ExpenseStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const Expense: Module<ExpenseStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default Expense
