import { MutationTree } from 'vuex'
import { InvoiceOnProductStateInterface } from './state'
import { InvoiceOnProduct } from 'src/interface/invoiceOnProduct'

const mutation: MutationTree<InvoiceOnProductStateInterface> = {
  INVOICE_ON_PRODUCT (state: InvoiceOnProductStateInterface, data: InvoiceOnProduct) {
    state.invoiceOnProduct = data
  },

  INVOICE_ON_PRODUCTS (state: InvoiceOnProductStateInterface, data: Array<InvoiceOnProduct>) {
    state.invoiceOnProducts = data
  }
}

export default mutation
