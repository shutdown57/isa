import { Invoice } from './invoice'

export type Product = {
  id?: number
  name: string
  description?: string
  quantity?: number
  price?: number
  createdAt?: Date
  updatedAt?: Date
  invoices?: Invoice
}

export type ProductUpdate = {
  id: number
  name: string
  description?: string
  quantity?: number
  price?: number
}

export type ProductCreate = {
  name: string
  description?: string
  quantity?: number
  price?: number
}

export type ProductSelect = {
  value: number
  label: string
}

export type SelectedProduct = {
  index: number
  name: string
  id: number
}

export type SelectedQuantity = {
  index: number
  quantity: number
}

export type SelectedPrice = {
  index: number
  price: number
}

export type ProductRow = {
  index?: number
  id?: number
  price?: number
  name?: string
  description?: string
  quantity?: number
}

export type InvoiceOnProduct = {
  id: number
  price: number
  quantity: number
  description?: string
  createdAt?: Date
  updatedAt?: Date
  invoiceId: Invoice
  productId: Product
  product: Product
}
