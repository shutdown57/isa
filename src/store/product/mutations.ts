import { MutationTree } from 'vuex'
import { ProductStateInterface } from './state'

const mutation: MutationTree<ProductStateInterface> = {
  PRODUCTS_SET (state: ProductStateInterface, data: Array<any>) {
    state.products = data
  },

  PRODUCT_SET (state: ProductStateInterface, data: any) {
    state.product = data
  }
}

export default mutation
