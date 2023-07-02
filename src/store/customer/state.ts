import { Customer } from '../../interface/customer'

export interface CustomerStateInterface {
  customers: Array<Customer>
  customer: Customer
}

function state (): CustomerStateInterface {
  return {
    customers: [] as Array<Customer>,
    customer: {} as Customer
  }
}

export default state
