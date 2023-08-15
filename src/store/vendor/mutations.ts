import { MutationTree } from 'vuex'
import { VendorStateInterface } from './state'
import { Vendor } from 'src/interface/vendor'

const mutation: MutationTree<VendorStateInterface> = {
  VENDORS_SET (state: VendorStateInterface, data: Array<Vendor>): void {
    state.vendors = data
  },

  VENDOR_SET (state: VendorStateInterface, data: Vendor): void {
    state.vendor = data
  }
}

export default mutation
