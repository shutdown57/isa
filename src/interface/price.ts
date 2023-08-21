import { Product } from './product'

export type Price = {
  id: number
  productId: number
  product: Product
  buy: number
  sell: number
  percent: number
}

export type PriceCreate = {
  productId: number
  buy?: number
  sell?: number
  percent?: number
}

export type PriceUpdate = {
  id: number
  productId: number
  buy?: number
  sell?: number
  percent?: number
}
