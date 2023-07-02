import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { InvoiceStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const invoice: Module<InvoiceStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default invoice
