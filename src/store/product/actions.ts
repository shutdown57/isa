import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { ProductStateInterface } from './state'

// @ts-ignore
const { database } = window

const actions: ActionTree<ProductStateInterface, StateInterface> = {
  async getProducts (context, payload = {}): Promise<void> {
    if (!('limit' in payload)) {
      payload.limit = 20
    }
    if (!('offset' in payload)) {
      payload.offset = 0
    }
    const data = await database.product('all', payload)
    context.commit('PRODUCTS_SET', data)
  },

  async createProduct (_, payload): Promise<void> {
    await database.product('create', payload)
  },

  async getProduct (context, payload): Promise<void> {
    const data = await database.product('byId', payload)
    context.commit('PRODUCT_SET', data)
  },

  async search (context, payload): Promise<void> {
    const data = await database.product('search', payload)
    context.commit('PRODUCTS_SET', data)
  },

  async update (_, payload): Promise<void> {
    await database.product('update', payload)
  }
}

export default actions
