<template lang="html">
  <q-card class="row justify-center">
    <q-card-section>
      <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
        <q-select
          v-if="!buy"
          v-model="customer"
          :options="customers"
          option-value="id"
          option-label="name"
          input-debounce="700"
          label="انتخاب مشتری"
          behavior="menu"
          use-input
          outlined
          dense
          @filter="filterCustomer"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          v-if="buy"
          v-model="vendor"
          :options="vendors"
          option-value="id"
          option-label="name"
          input-debounce="700"
          label="انتخاب فروشنده"
          behavior="menu"
          use-input
          outlined
          dense
          @filter="filterVendor"
        >
          <template #no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          v-model="account"
          :label="`انتخاب حساب ${buy ? 'برداشت' : 'واریز'}`"
          :options="accounts"
          option-label="name"
          option-value="id"
          input-debounce="700"
          behavior="menu"
          use-input
          outlined
          dense
          @filter="filterAccount"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-btn color="secondary" label="ثبت" @click.prevent="handler" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed, ref } from 'vue'
import { useStore } from 'src/store'
import { SelectOption } from 'src/interface/utils'
import { Customer } from 'src/interface/customer'
import { Vendor } from 'src/interface/vendor'
import { Invoice } from 'src/interface/invoice'
import { Account } from 'src/interface/account'
import { FilterSelect } from 'src/utils/Filters'

const props = defineProps<{invoice: Invoice}>()
const store = useStore()

const emit = defineEmits<{(e: 'SelectedValues', selectedValues: { customer?: SelectOption, vendor?: SelectOption, account?: SelectOption }): void}>()

const buy = ref(false)
const selectedCustomer = reactive({ id: null, name: '' })
const selectedVendor = reactive({ id: null, name: '' })
const selectedAccount = reactive({ id: null, name: '' })

const customer = computed({
  get () {
    return selectedCustomer
  },
  set (value) {
    if (!value) return
    selectedCustomer.id = value.id
    selectedCustomer.name = value.name
  }
})
const vendor = computed({
  get () {
    return selectedVendor
  },
  set (value) {
    if (!value) return
    selectedVendor.id = value.id
    selectedVendor.name = value.name
  }
})
const account = computed({
  get () {
    return selectedAccount
  },
  set (value) {
    if (!value) return
    selectedAccount.id = value.id
    selectedAccount.name = value.name
  }
})
const customers = computed<Array<Customer>>(() => store.getters['customer/customers'])
const vendors = computed<Array<Vendor>>(() => store.getters['vendor/vendors'])
const accounts = computed<Array<Account>>(() => store.getters['account/accounts'])

onMounted(async () => {
  await store.dispatch('customer/getCustomers')
  await store.dispatch('vendor/getVendors')
  await store.dispatch('account/getAccounts')
  buy.value = props.invoice.buy === true

  if (props.invoice.customerId) {
    await store.dispatch('customer/getCustomer', { id: props.invoice.customerId })
    const c = await store.getters['customer/customer']
    selectedCustomer.id = c.id
    selectedCustomer.name = c.name
  }
})

const handler = () => {
  const selecteds = {}
  if (customer.value?.id && customer.value?.name) {
    const c: SelectOption = { id: customer.value.id, name: customer.value.name }
    Object.assign(selecteds, { customer: c })
  }
  if (vendor.value?.id && vendor.value?.name) {
    const v: SelectOption = { id: vendor.value.id, name: vendor.value.name }
    Object.assign(selecteds, { vendor: v })
  }
  if (account.value?.id && account.value?.name) {
    const a: SelectOption = { id: account.value.id, name: account.value.name }
    Object.assign(selecteds, { account: a })
  }
  emit('SelectedValues', selecteds)
}

const filterVendor = new FilterSelect('vendor/getVendors', 'vendor/search').create()
const filterCustomer = new FilterSelect('customer/getCustomers', 'customer/search').create()
const filterAccount = new FilterSelect('account/getAccounts', 'account/search').create()
</script>
