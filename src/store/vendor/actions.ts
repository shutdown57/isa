import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { VendorStateInterface } from './state'

// @ts-ignore
const { database } = window

const actions: ActionTree<VendorStateInterface, StateInterface> = {
  async getVendors (context, payload = {}) {
    if (!('limit' in payload)) {
      payload.limit = 20
    }
    if (!('offset' in payload)) {
      payload.offset = 0
    }
    const data = await database.vendor('all', payload)
    context.commit('VENDORS_SET', data)
  },

  async createVendor (_, payload) {
    await database.vendor('create', payload)
  },

  async getVendor (context, payload) {
    const data = await database.vendor('byId', payload)
    context.commit('VENDOR_SET', data)
  }
}

export default actions
