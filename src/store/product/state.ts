import { Product } from '../../interface/product'

export interface ProductStateInterface {
  products: Array<Product>
  product: Product
}

function state (): ProductStateInterface {
  return {
    products: [] as Array<Product>,
    product: {} as Product
  }
}

export default state
