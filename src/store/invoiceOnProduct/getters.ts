import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { InvoiceOnProductStateInterface } from './state'

const getters: GetterTree<InvoiceOnProductStateInterface, StateInterface> = {
  invoiceOnProduct: context => context.invoiceOnProduct,
  invoiceOnProducts: context => context.invoiceOnProducts
}

export default getters
