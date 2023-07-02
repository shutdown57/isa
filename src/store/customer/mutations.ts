import { MutationTree } from 'vuex'
import { CustomerStateInterface } from './state'

const mutation: MutationTree<CustomerStateInterface> = {
  CUSTOMERS_SET (state: CustomerStateInterface, data: Array<any>) {
    state.customers = data
  },

  CUSTOMER_SET (state: CustomerStateInterface, data: any) {
    state.customer = data
  }
}

export default mutation
