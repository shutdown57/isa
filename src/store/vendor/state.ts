import { Vendor } from '../../interface/vendor'

export interface VendorStateInterface {
  vendors: Array<Vendor>
  vendor: Vendor
}

function state (): VendorStateInterface {
  return {
    vendors: [] as Array<Vendor>,
    vendor: {} as Vendor
  }
}

export default state
