import { MutationTree } from 'vuex'
import { InvoiceStateInterface } from './state'
import { Invoice } from 'src/interface/invoice'
import { Product } from 'src/interface/product'

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
  },

  CLEAR (state: InvoiceStateInterface) {
    state.invoices = [] as Array<Invoice>
    state.invoice = {} as Invoice
    state.products = [] as Array<Product>
    state.count = 0 as number
  }
}

export default mutation
