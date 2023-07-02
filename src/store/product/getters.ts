import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ProductStateInterface } from './state'

const getters: GetterTree<ProductStateInterface, StateInterface> = {
  products (context) {
    return context.products
  },

  product (context) {
    return context.product
  }
}

export default getters
