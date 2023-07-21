import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { InstallmentStateInterface } from './state'

// @ts-ignore
const { database } = window

const actions: ActionTree<InstallmentStateInterface, StateInterface> = {
  async setInstallment (context, payload) {
    try {
      const data = await database.installment('create', payload)
      context.commit('INSTALLMENT_SET', data)
    } catch (err) {
      console.error(err)
    }
  },

  async setInstallments (context, payload) {
    try {
      const data = await database.installment('createAll', payload)
      context.commit('INSTALLMENTS_SET', data)
    } catch (err) {
      console.error(err)
    }
  }
}

export default actions
