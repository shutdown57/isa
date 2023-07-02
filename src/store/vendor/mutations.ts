import { MutationTree } from 'vuex'
import { VendorStateInterface } from './state'

const mutation: MutationTree<VendorStateInterface> = {
  VENDORS_SET (state: VendorStateInterface, data: Array<any>) {
    state.vendors = data
  },

  VENDOR_SET (state: VendorStateInterface, data: any) {
    state.vendor = data
  }
}

export default mutation
