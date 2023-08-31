import { Invoice } from './invoice'
import { Price } from './price'

export type Product = {
  id?: number
  name: string
  description?: string
  quantity?: number
  createdAt?: Date
  updatedAt?: Date
  invoices?: Invoice
  price?: Price
}

export type ProductUpdate = {
  id: number
  name: string
  description?: string
  quantity?: number
}

export type ProductCreate = {
  name: string
  description?: string
  quantity?: number
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
  price: bigint
}

export type ProductRow = {
  index?: number
  id?: number
  name?: string
  description?: string
  quantity?: number
  price?: Price
}

export type ProductQuantity = {
  id: number
  quantity: number
}
