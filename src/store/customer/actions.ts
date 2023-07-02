import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { CustomerStateInterface } from './state'

// @ts-ignore
const { database } = window

const actions: ActionTree<CustomerStateInterface, StateInterface> = {
  async getCustomers (context, payload = {}) {
    if (!('limit' in payload)) {
      payload.limit = 20
    }
    if (!('offset' in payload)) {
      payload.offset = 0
    }
    const data = await database.customer('all', payload)
    context.commit('CUSTOMERS_SET', data)
  },

  async createCustomer (_, payload) {
    await database.customer('create', payload)
  },

  async getCustomer (context, payload) {
    const data = await database.customer('byId', payload)
    context.commit('CUSTOMER_SET', data)
  },

  async search (context, payload) {
    const data = await database.customer('search', payload)
    context.commit('CUSTOMERS_SET', data)
  }
}

export default actions
