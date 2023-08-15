import { MutationTree } from 'vuex'
import { CustomerStateInterface } from './state'
import { Customer } from 'src/interface/customer'

const mutation: MutationTree<CustomerStateInterface> = {
  CUSTOMERS_SET (state: CustomerStateInterface, data: Array<Customer>): void {
    state.customers = data
  },

  CUSTOMER_SET (state: CustomerStateInterface, data: Customer): void {
    state.customer = data
  }
}

export default mutation
