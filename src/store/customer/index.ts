import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { CustomerStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const customer: Module<CustomerStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default customer
