import { Product } from './product'
import { Invoice } from './invoice'

export type InvoiceOnProduct = {
  id: number
  price: number
  quantity: number
  description?: string
  createdAt?: Date
  updatedAt?: Date
  invoiceId: number
  productId: number
  invoice?: Invoice
  product?: Product
}
