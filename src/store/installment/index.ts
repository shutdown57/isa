import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { InstallmentStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const installment: Module<InstallmentStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default installment
