import { MutationTree } from 'vuex'
import { AccountStateInterface } from './state'

const mutation: MutationTree<AccountStateInterface> = {
  ACCOUNTS_SET (state: AccountStateInterface, data: Array<any>) {
    state.accounts = data
  },

  ACCOUNT_SET (state: AccountStateInterface, data: any) {
    state.account = data
  }
}

export default mutation
