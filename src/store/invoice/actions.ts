import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { InvoiceStateInterface } from './state'

// @ts-ignore
const { database } = window

const actions: ActionTree<InvoiceStateInterface, StateInterface> = {
  async getSellInvoices (context, payload = {}) {
    if (!('limit' in payload)) {
      payload.limit = 20
    }
    if (!('offset' in payload)) {
      payload.offset = 0
    }
    if (!('buy' in payload)) {
      payload.buy = false
    }
    const data = await database.invoice('all', payload)
    context.commit('INVOICES_SET', data)
  },

  async getBuyInvoices (context, payload = {}) {
    if (!('limit' in payload)) {
      payload.limit = 20
    }
    if (!('offset' in payload)) {
      payload.offset = 0
    }
    if (!('buy' in payload)) {
      payload.buy = true
    }
    const data = await database.invoice('all', payload)
    context.commit('INVOICES_SET', data)
  },

  async createInvoice (context, payload) {
    const data = await database.invoice('create', payload)
    context.commit('INVOICE_SET', data)
  },

  async getInvoice (context, payload) {
    const data = await database.invoice('byId', payload)
    context.commit('INVOICE_SET', data)
  },

  async updateInvoice (context, payload) {
    await database.invoice('update', payload)
    const { id } = payload
    await context.dispatch('getInvoice', { id: parseInt(id) })
  },

  async upsertProducts (context, payload) {
    const products = JSON.parse(JSON.stringify(payload.products))
    const { id } = payload
    await database.invoice('upsertProducts', { id, products })
    // await context.dispatch('getInvoice', { id: parseInt(id) })
  },

  async productAdd (context, payload): Promise<void> {
    context.commit('INVOICE_PRODUCTS_ADD', payload)
  },

  async productRemove (context, payload): Promise<void> {
    context.commit('INVOICE_PRODUCTS_REMOVE', payload)
  }
}

export default actions
