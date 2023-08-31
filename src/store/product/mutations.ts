import { MutationTree } from 'vuex'
import { ProductStateInterface } from './state'
import { Product } from 'src/interface/product'

const mutation: MutationTree<ProductStateInterface> = {
  PRODUCTS_SET (state: ProductStateInterface, data: Array<Product>): void {
    state.products = data
  },

  PRODUCT_SET (state: ProductStateInterface, data: Product): void {
    state.product = data
  },

  CLEAR (state: ProductStateInterface) {
    state.products = [] as Array<Product>
    state.product = {} as Product
  }
}

export default mutation
