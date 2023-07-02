import { Invoice } from '../../interface/invoice'
import { Product } from '../../interface/product'

export interface InvoiceStateInterface {
  invoices: Array<Invoice>
  invoice: Invoice
  products: Array<Product>
}

function state (): InvoiceStateInterface {
  return {
    invoices: [] as Array<Invoice>,
    invoice: {} as Invoice,
    products: [] as Array<Product>
  }
}

export default state
