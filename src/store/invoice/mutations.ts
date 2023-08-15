import { MutationTree } from 'vuex'
import { InvoiceStateInterface } from './state'
import { Invoice } from 'src/interface/invoice'

const mutation: MutationTree<InvoiceStateInterface> = {
  INVOICES_SET (state: InvoiceStateInterface, data: Array<Invoice>): void {
    state.invoices = data
  },

  INVOICE_SET (state: InvoiceStateInterface, data: Invoice): void {
    state.invoice = data
  },

  INVOICE_PRODUCTS_CLEAR (state: InvoiceStateInterface): void {
    state.products = []
  },

  INVOICE_COUNT (state: InvoiceStateInterface, data: number): void {
    state.count = data
  }
}

export default mutation
