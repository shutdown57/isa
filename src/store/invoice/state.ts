import { Invoice } from '../../interface/invoice'
import { Product } from '../../interface/product'

export interface InvoiceStateInterface {
  invoices: Array<Invoice>
  invoice: Invoice
  products: Array<Product>
  count: number
}

function state (): InvoiceStateInterface {
  return {
    invoices: [] as Array<Invoice>,
    invoice: {} as Invoice,
    products: [] as Array<Product>,
    count: 0 as number
  }
}

export default state
