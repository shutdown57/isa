import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ProductStateInterface } from './state'

// @ts-ignore
const { database } = window

const actions: ActionTree<ProductStateInterface, StateInterface> = {
  async getProducts (context, payload = {}): Promise<void> {
    try {
      if (!('limit' in payload)) {
        payload.limit = 20
      }
      if (!('offset' in payload)) {
        payload.offset = 0
      }
      const data = await database.product('all', payload)
      context.commit('PRODUCTS_SET', data)
    } catch (err: unknown) {
      console.error(err)
    }
  },

  async createProduct ({ commit }, payload): Promise<void> {
    try {
      const data = await database.product('create', payload)
      commit('PRODUCT_SET', data)
    } catch (err: unknown) {
      console.error(err)
    }
  },

  async getProduct (context, payload): Promise<void> {
    try {
      const data = await database.product('byId', payload)
      context.commit('PRODUCT_SET', data)
    } catch (err: unknown) {
      console.error(err)
    }
  },

  async search (context, payload): Promise<void> {
    try {
      const data = await database.product('search', payload)
      context.commit('PRODUCTS_SET', data)
    } catch (err: unknown) {
      console.error(err)
    }
  },

  async update (_, payload): Promise<void> {
    try {
      await database.product('update', payload)
    } catch (err: unknown) {
      console.error(err)
    }
  },

  async quantity (_, payload): Promise<void> {
    try {
      await database.product('quantity', payload)
    } catch (err: unknown) {
      console.error(err)
    }
  }
}

export default actions
