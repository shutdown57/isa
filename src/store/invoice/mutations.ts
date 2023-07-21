import { MutationTree } from 'vuex'
import { InvoiceStateInterface } from './state'
import { Invoice } from 'src/interface/invoice'
import { Product } from 'src/interface/product'

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

  INVOICE_PRODUCTS_CLEAR (state: InvoiceStateInterface) {
    state.products = []
  },

  INVOICE_PRODUCTS_REMOVE (state: InvoiceStateInterface, data: number) {
    state.invoice.products?.splice(data, 1)
  },

  INVOICE_COUNT (state: InvoiceStateInterface, data: number) {
    state.count = data
  }
}

export default mutation
