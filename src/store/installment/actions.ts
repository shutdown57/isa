import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { InstallmentStateInterface } from './state'

// @ts-ignore
const { database } = window

const actions: ActionTree<InstallmentStateInterface, StateInterface> = {
  async create ({ commit }, payload): Promise<void> {
    try {
      const data = await database.installment('create', payload)
      commit('INSTALLMENT_SET', data)
    } catch (err: unknown) {
      console.error(err)
    }
  },

  async update (_, payload): Promise<void> {
    try {
      await database.installment('update', payload)
    } catch (err: unknown) {
      console.error(err)
    }
  }
}

export default actions
