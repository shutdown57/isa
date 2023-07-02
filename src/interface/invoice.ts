import { Product, ProductRow } from './product'
import { Customer } from './customer'
import { Installment } from './installment'
import { Account } from './account'
import { Vendor } from './vendor'

export type Invoice = {
  id?: number
  number?: string
  totalAmount?: number
  description?: string
  installment?: boolean
  installmentQuantity?: number
  prepayment?: number
  buy?: boolean
  createdAt?: Date
  updatedAt?: Date
  installments?: Array<Installment>
  customerId?: number
  customer?: Customer
  products?: Array<Product>
  accountId?: number
  account?: Account
  vendorId?: number
  vendor?: Vendor
}

export type InvoiceCreate = {
  number?: string
  totalAmount?: number
  description?: string
  installment?: boolean
  installmentQuantity?: number
  prepayment?: number
  buy?: boolean
  customerId?: number
  vendorId?: number
  accountId?: number
}

export type InvoiceUpdate = {
  id: number
  number?: string
  totalAmount?: number
  description?: string
  installment?: boolean
  installmentQuantity?: number
  prepayment?: number
  buy?: boolean
  customerId?: number
  vendorId?: number
  accountId?: number
}

export type InvoiceProduct = {
  id: number
  products: Array<ProductRow>
}
