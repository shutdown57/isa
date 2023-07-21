import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { InstallmentStateInterface } from './state'

const getters: GetterTree<InstallmentStateInterface, StateInterface> = {
  installment (state) {
    return state.installment
  },
  installments (state) {
    return state.installments
  }
}

export default getters
