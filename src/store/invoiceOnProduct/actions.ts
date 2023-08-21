import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { InvoiceOnProductStateInterface } from './state'

// @ts-ignore
const { database } = window

const actions: ActionTree<InvoiceOnProductStateInterface, StateInterface> = {
  async all ({ commit }, payload) {
    const data = await database.iop('all', payload)
    commit('INVOICE_ON_PRODUCTS', data)
  }
}

export default actions
