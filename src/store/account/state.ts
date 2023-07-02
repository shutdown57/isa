import { Account } from '../../interface/account'

export interface AccountStateInterface {
  accounts: Array<Account>
  account: Account
}

function state (): AccountStateInterface {
  return {
    accounts: [] as Array<Account>,
    account: {} as Account
  }
}

export default state
