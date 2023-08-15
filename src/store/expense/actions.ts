import { ActionTree } from 'vuex'
import { StateInterface } from 'src/store'
import { ExpenseStateInterface } from './state'
import { CommonQueryParams } from 'src/utils/CommonQueryParams'
import { ExpenseCreate, ExpenseDelete } from 'src/interface/expense'

// @ts-ignore
const { database } = window

const actions: ActionTree<ExpenseStateInterface, StateInterface> = {
  async getExpenses ({ commit }, payload): Promise<void> {
    try {
      const cqp = new CommonQueryParams(payload)
      const data = await database.expense('all', cqp.params)
      commit('EXPENSES', data)
    } catch (err: unknown) {
      console.error(err)
    }
  },

  async getExpense ({ commit }, payload): Promise<void> {
    try {
      const data = await database.expense('byId', payload)
      commit('EXPENSE', data)
    } catch (err: unknown) {
      console.error(err)
    }
  },

  async create (_, payload: ExpenseCreate): Promise<void> {
    try {
      await database.expense('create', payload)
    } catch (err: unknown) {
      console.error(err)
    }
  },

  async count ({ commit }): Promise<void> {
    try {
      const data = await database.expense('count')
      commit('COUNT', data)
    } catch (err: unknown) {
      console.error(err)
    }
  },

  async remove (_, payload: ExpenseDelete): Promise<void> {
    try {
      await database.expense('remove', payload)
    } catch (err: unknown) {
      console.error(err)
    }
  },

  async update (_, payload): Promise<void> {
    try {
      await database.expense('update', payload)
    } catch (err: unknown) {
      console.error(err)
    }
  }
}

export default actions
