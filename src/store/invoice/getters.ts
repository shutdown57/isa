import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { InvoiceStateInterface } from './state'
import { Invoice } from '../../interface/invoice'
import { Product } from '../../interface/product'

const getters: GetterTree<InvoiceStateInterface, StateInterface> = {
  invoices (context): Array<Invoice> {
    return context.invoices
  },

  invoice (context): Invoice {
    return context.invoice
  },

  products (context): Array<Product> {
    return context.products
  }
}

export default getters
