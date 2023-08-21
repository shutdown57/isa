import { InvoiceOnProduct } from 'src/interface/invoiceOnProduct'
export interface InvoiceOnProductStateInterface {
  invoiceOnProduct: InvoiceOnProduct,
  invoiceOnProducts: Array<InvoiceOnProduct>
}

function state (): InvoiceOnProductStateInterface {
  return {
    invoiceOnProduct: {} as InvoiceOnProduct,
    invoiceOnProducts: [] as Array<InvoiceOnProduct>
  }
}

export default state
