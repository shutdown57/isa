import { MutationTree } from 'vuex'
import { AccountStateInterface } from './state'
import { Account } from 'src/interface/account'

const mutation: MutationTree<AccountStateInterface> = {
  ACCOUNTS_SET (state: AccountStateInterface, data: Array<Account>): void {
    state.accounts = data
  },

  ACCOUNT_SET (state: AccountStateInterface, data: Account): void {
    state.account = data
  }
}

export default mutation
