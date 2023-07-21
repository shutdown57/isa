import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import { Router } from 'vue-router'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore
} from 'vuex'
import product from './product'
import customer from './customer'
import account from './account'
import invoice from './invoice'
import vendor from './vendor'
import installment from './installment'
import { ProductStateInterface } from './product/state'
import { CustomerStateInterface } from './customer/state'
import { AccountStateInterface } from './account/state'
import { InvoiceStateInterface } from './invoice/state'
import { VendorStateInterface } from './vendor/state'
import { InstallmentStateInterface } from './installment/state'

// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  // example: unknown
  product: ProductStateInterface,
  customer: CustomerStateInterface,
  account: AccountStateInterface,
  invoice: InvoiceStateInterface,
  vendor: VendorStateInterface,
  installment: InstallmentStateInterface
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

// Provide typings for `this.$router` inside Vuex store
 declare module 'vuex' {
   export interface Store<S> {
     readonly $router: Router;
   }
 }

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      product,
      customer,
      account,
      invoice,
      vendor,
      installment
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING
  })

  return Store
})

export function useStore () {
  return vuexUseStore(storeKey)
}
