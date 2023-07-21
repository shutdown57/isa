import { Installment } from 'src/interface/installment'
import { MutationTree } from 'vuex'
import { InstallmentStateInterface } from './state'

const mutation: MutationTree<InstallmentStateInterface> = {
  INSTALLMENT_SET (state: InstallmentStateInterface, data: Installment) {
    state.installment = data
  },

  INSTALLMENTS_SET (state: InstallmentStateInterface, data: Array<Installment>) {
    state.installments = data
  },

  CLEAR_ALL (state: InstallmentStateInterface) {
    state.installments = []
    state.installment = {}
  }
}

export default mutation
