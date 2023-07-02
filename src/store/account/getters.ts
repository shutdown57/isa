import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { AccountStateInterface } from './state'

const getters: GetterTree<AccountStateInterface, StateInterface> = {
  accounts (context) {
    return context.accounts
  },

  account (context) {
    return context.account
  }
}

export default getters
