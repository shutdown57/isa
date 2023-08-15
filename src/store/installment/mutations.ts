import { Installment } from 'src/interface/installment'
import { MutationTree } from 'vuex'
import { InstallmentStateInterface } from './state'

const mutation: MutationTree<InstallmentStateInterface> = {
  INSTALLMENT_SET (state: InstallmentStateInterface, data: Installment): void {
    state.installment = data
  },

  INSTALLMENTS_SET (state: InstallmentStateInterface, data: Array<Installment>): void {
    state.installments = data
  },

  CLEAR_ALL (state: InstallmentStateInterface): void {
    state.installments = []
    state.installment = {}
  }
}

export default mutation
