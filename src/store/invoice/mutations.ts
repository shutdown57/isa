import { MutationTree } from 'vuex'
import { InvoiceStateInterface } from './state'
import { Invoice } from '../../interface/invoice'
import { Product } from '../../interface/product'

const mutation: MutationTree<InvoiceStateInterface> = {
  INVOICES_SET (state: InvoiceStateInterface, data: Array<Invoice>) {
    state.invoices = data
  },

  INVOICE_SET (state: InvoiceStateInterface, data: Invoice) {
    state.invoice = data
  },

  INVOICE_PRODUCTS_ADD (state: InvoiceStateInterface, data: Product) {
    state.products.push(data)
  },

  INVOICE_PRODUCTS_REMOVE (state: InvoiceStateInterface, data: number) {
    state.invoice.products?.splice(data, 1)
  }
}

export default mutation
