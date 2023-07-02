import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { AccountStateInterface } from './state'

// @ts-ignore
const { database } = window

const actions: ActionTree<AccountStateInterface, StateInterface> = {
  async getAccounts (context, payload = {}) {
    if (!('limit' in payload)) {
      payload.limit = 20
    }
    if (!('offset' in payload)) {
      payload.offset = 0
    }
    const data = await database.account('all', payload)
    context.commit('ACCOUNTS_SET', data)
  },

  async createAccount (_, payload) {
    await database.account('create', payload)
  },

  async updateAccount (_, payload) {
    await database.account('update', payload)
  },

  async getAccount (context, payload) {
    const data = await database.account('byId', payload)
    context.commit('ACCOUNT_SET', data)
  },

  async search (context, payload) {
    const data = await database.account('search', payload)
    context.commit('ACCOUNTS_SET', data)
  }
}

export default actions
