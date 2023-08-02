import { ActionTree } from 'vuex'
import { StateInterface } from 'src/store'
import { ExpenseStateInterface } from './state'
import { CommonQueryParams } from 'src/utils/CommonQueryParams'

// @ts-ignore
const { database } = window

const actions: ActionTree<ExpenseStateInterface, StateInterface> = {
  async getExpenses ({ commit }, payload) {
    try {
      const cqp = new CommonQueryParams(payload)
      const data = await database.expense('all', cqp.params)
      commit('EXPENSES', data)
    } catch (err: any) {
      console.error(err)
    }
  },

  async create (_, payload) {
    try {
      await database.expense('create', payload)
    } catch (err: any) {
      console.error(err)
    }
  }
}

export default actions
