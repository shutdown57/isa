import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { InvoiceStateInterface } from './state'

// @ts-ignore
const { database } = window

const actions: ActionTree<InvoiceStateInterface, StateInterface> = {
  async getSellInvoices (context, payload = {}): Promise<void> {
    try {
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
    } catch (err) {
      console.error(err)
    }
  },

  async getBuyInvoices (context, payload = {}): Promise<void> {
    try {
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
    } catch (err) {
      console.error(err)
    }
  },

  async createInvoice (context, payload): Promise<void> {
    try {
      const data = await database.invoice('create', payload)
      context.commit('INVOICE_SET', data)
    } catch (err) {
      console.error(err)
    }
  },

  async getInvoice (context, payload): Promise<void> {
    try {
      const data = await database.invoice('byId', payload)
      context.commit('INVOICE_SET', data)
    } catch (err) {
      console.error(err)
    }
  },

  async updateInvoice ({ dispatch }, payload): Promise<void> {
    try {
      await database.invoice('update', payload)
      const { id } = payload
      await dispatch('getInvoice', { id: parseInt(id) })
    } catch (err) {
      console.error(err)
    }
  },

  async upsertProducts (_, payload): Promise<void> {
    try {
      const { id } = payload
      await database.invoice('upsertProducts', {
        id,
        products: payload.products,
        prepayment: JSON.parse(JSON.stringify(payload.prepayment)),
        installmentQuantity: JSON.parse(JSON.stringify(payload.installmentQuantity)),
        installment: JSON.parse(JSON.stringify(payload.installment))
      })
    } catch (err) {
      console.error(err)
    }
  },

  async count (context, payload): Promise<void> {
    try {
      const data = await database.invoice('count', payload)
      context.commit('INVOICE_COUNT', data)
    } catch (err) {
      console.error(err)
    }
  }
}

export default actions
