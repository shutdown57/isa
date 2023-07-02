import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { VendorStateInterface } from './state'

const getters: GetterTree<VendorStateInterface, StateInterface> = {
  vendors (context) {
    return context.vendors
  },

  vendor (context) {
    return context.vendor
  }
}

export default getters
