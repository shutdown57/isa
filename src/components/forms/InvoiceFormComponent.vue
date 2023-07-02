<template lang="html">
  <q-card class="row justify-center">
    <q-card-section>
      <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
        <q-input outlined dense v-model="number" label="شماره فاکتور" />

        <q-toggle
          :label="`${buy ? 'خرید' : 'فروش'}`"
          v-model="buy"
        />

        <q-toggle
          :label="`${installment ? 'اقساط' : 'نقد'}`"
          v-model="installment"
        />

        <q-input v-if="installment" outlined dense v-model="installmentQuantity" label="تعداد اقساط" />

        <q-input v-if="installment" outlined dense v-model="prepayment" label="پیش پرداخت" />

        <q-select
          v-if="!buy"
          v-model="customer"
          use-input
          input-debounce="700"
          label="انتخاب مشتری"
          :options="customersTemp"
          @filter="filterCustomer"
          behavior="menu"
          dense
          outlined
        >
          <template v-slot:no-option>
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
          use-input
          input-debounce="700"
          label="انتخاب فروشنده"
          :options="vendorsTemp"
          @filter="filterVendor"
          behavior="menu"
          dense
          outlined
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          v-model="account"
          use-input
          input-debounce="700"
          :label="`انتخاب حساب ${buy ? 'برداشت' : 'واریز'}`"
          :options="accountsTemp"
          @filter="filterAccount"
          behavior="menu"
          dense
          outlined
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-input outlined dense v-model="description" label="توضیحات فاکتور" type="textarea" />

        <span>
          مبلغ فاکتور

          <q-field square filled dense>
            <template v-slot:prepend>
              <q-icon name="payments" />
            </template>

            <template v-slot:control>
              <div class="self-center full-width no-outline">
                {{ enToFa(addComma(`${totalAmount}`)) }}
              </div>
            </template>
          </q-field>
        </span>

        <q-btn color="secondary" label="ثبت" @click.prevent="handleCreateInvoice" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mapGetters } from 'vuex'
import { Customer } from 'src/interface/customer'
import { Vendor } from 'src/interface/vendor'
import { SelectOption } from 'src/interface/utils'
import { Invoice } from 'src/interface/invoice'
import { Account } from 'src/interface/account'
import Tools from 'src/mixins/tools'
import Jalaali from 'src/mixins/jalaali'

export default defineComponent({
  name: 'InvoiceFormComponent',

  mixins: [Tools, Jalaali],

  props: {
    totalAmount: {
      type: Number as PropType<number>,
      default: 0
    }
  },

  data () {
    return {
      customer: undefined as SelectOption | undefined,
      vendor: undefined as SelectOption | undefined,
      number: '' as string,
      installment: true as boolean,
      buy: false as boolean,
      installmentQuantity: '3' as string,
      prepayment: '0' as string,
      account: undefined as SelectOption | undefined,
      description: '' as string
    }
  },

  computed: {
    ...mapGetters({
      customers: 'customer/customers',
      vendors: 'vendor/vendors',
      accounts: 'account/accounts'
    }),

    customersTemp (): Array<SelectOption> {
      return this.customers
        .map((v: Customer) => ({ value: v.id, label: v.name }))
    },

    accountsTemp (): Array<SelectOption> {
      return this.accounts
        .map((v: Account) => ({ value: v.id, label: v.name }))
    },

    vendorsTemp (): Array<SelectOption> {
      return this.vendors
        .map((v: Vendor) => ({ value: v.id, label: v.name }))
    }
  },

  async mounted () {
    await this.fetchData()
  },

  methods: {
    async fetchData () {
      const { id } = this.$route.query
      if (id) {
        await this.$store.dispatch('invoice/getInvoice', { id })
        const invoice = await this.$store.getters['invoice/invoice']

        if (invoice.buy) {
          await this.$store.dispatch('vendor/getVendor', { id: invoice.vendorId })
          const vendor = await this.$store.getters['vendor/vendor']
          this.vendor = { value: vendor.id, label: vendor.name }
        } else {
          await this.$store.dispatch('customer/getCustomer', { id: invoice.customerId })
          const customer = await this.$store.getters['customer/customer']
          this.customer = { value: customer.id, label: customer.name }
        }
        await this.$store.dispatch('account/getAccount', { id: invoice.accountId })
        const account = await this.$store.getters['account/account']
        this.account = { value: account.id, label: account.name }
        this.number = invoice?.number ?? ''
        this.installment = invoice?.installment ?? true
        this.buy = invoice?.buy ?? false
        this.installmentQuantity = invoice?.installmentQuantity?.toString() ?? '3'
        this.prepayment = invoice?.prepayment?.toString() ?? '0'
        this.description = invoice?.description ?? ''
      }

      await this.$store.dispatch('customer/getCustomers')
      await this.$store.dispatch('vendor/getVendors')
      await this.$store.dispatch('account/getAccounts')
      this.customersTemp = await this.customers
        .map((v: Customer) => ({ value: v.id, label: v.name }))
      this.vendorsTemp = await this.vendors
        .map((v: Vendor) => ({ value: v.id, label: v.name }))
      this.accountsTemp = await this.accounts
        .map((v: Account) => ({ value: v.id, label: v.name }))
    },

    filterCustomer (val: string, update: any): void {
      if (val === '') {
        update(() => {
          this.customersTemp = this.customers.map((v: Customer) => ({ value: v.id, label: v.name }))
        })
        return
      }

      update(async () => {
        const needle = val.toLowerCase()
        await this.$store.dispatch('customer/search', { needle })
        const customers = await this.$store.getters['customer/customers']
        this.customersTemp = customers
          .filter((v: Customer) => v.name && v.name.toLowerCase().includes(needle))
          .map((v: Customer) => ({ value: v.id, label: v.name }))
      })
    },

    filterVendor (val: string, update: any): void {
      if (val === '') {
        update(() => {
          this.vendorsTemp = this.vendors.map((v: Vendor) => ({ value: v.id, label: v.name }))
        })
        return
      }

      update(async () => {
        const needle = val.toLowerCase()
        await this.$store.dispatch('vendor/search', { needle })
        const vendors = await this.$store.getters['vendor/vendors']
        this.vendorsTemp = vendors
          .filter((v: Vendor) => v.name.toLowerCase().includes(needle))
          .map((v: Vendor) => ({ value: v.id, label: v.name }))
      })
    },

    filterAccount (val: string, update: any): void {
      if (val === '') {
        update(() => {
          this.accountsTemp = this.accounts.map((v: Account) => ({ value: v.id, label: v.name }))
        })
        return
      }

      update(async () => {
        const needle = val.toLowerCase()
        await this.$store.dispatch('account/search', { needle })
        const accounts = await this.$store.getters['account/accounts']
        this.accountsTemp = accounts
          .filter((v: Account) => v.name.toLowerCase().includes(needle))
          .map((v: Account) => ({ value: v.id, label: v.name }))
      })
    },

    handleCreateInvoice () {
      const invoice: Invoice = {
        customerId: this.customer ? this.customer.value : undefined,
        vendorId: this.vendor ? this.vendor.value : undefined,
        number: this.number,
        installment: this.installment,
        buy: this.buy,
        installmentQuantity: parseInt(this.installmentQuantity),
        prepayment: parseInt(this.prepayment),
        accountId: this.account ? this.account.value : undefined,
        description: this.description
      }

      this.$emit('InvoiceValues', invoice)
    }
  }
})
</script>
