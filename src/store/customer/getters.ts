import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { CustomerStateInterface } from './state'

const getters: GetterTree<CustomerStateInterface, StateInterface> = {
  customers (context) {
    return context.customers
  },

  customer (context) {
    return context.customer
  }
}

export default getters
