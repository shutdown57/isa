import { Product } from './product'

export type Price = {
  id: number
  productId: number | null
  product?: Product | null
  buy: bigint | null
  sell: bigint | null
  percent: number | null
}

export type PriceCreate = {
  productId: number
  buy?: bigint
  sell?: bigint
  percent?: number
}

export type PriceUpdate = {
  id: number
  productId: number
  buy?: bigint
  sell?: bigint
  percent?: number
}
