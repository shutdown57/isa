<template lang="html">
  <q-card class="row justify-center">
    <q-card-section>
      <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
        <q-input outlined dense v-model="number" label="شماره فاکتور" />

        <q-toggle :label="`${buy ? 'خرید' : 'فروش'}`" v-model="buy" />

        <q-toggle :label="`${installment ? 'اقساط' : 'نقد'}`" v-model="installment" />

        <q-input v-if="installment" outlined dense v-model="installmentQuantity" label="تعداد اقساط" />

        <q-input v-if="installment" outlined dense v-model="prepayment" label="پیش پرداخت" />

        <q-input outlined dense v-model="description" label="توضیحات فاکتور" type="textarea" />

        <!-- <span> -->
        <!--   مبلغ فاکتور -->

        <!--   <q-field square filled dense> -->
        <!--     <template v-slot:prepend> -->
        <!--       <q-icon name="payments" /> -->
        <!--     </template> -->

        <!--     <template v-slot:control> -->
        <!--       <div class="self-center full-width no-outline"> -->
        <!--         {{ digitsEnToFa(addCommas(`${totalAmount}`)) }} -->
        <!--       </div> -->
        <!--     </template> -->
        <!--   </q-field> -->
        <!-- </span> -->

        <q-btn color="secondary" label="ثبت" @click.prevent="handleCreateInvoice" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
// import { addCommas, digitsEnToFa } from 'src/boot/persianTools'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Invoice } from 'src/interface/invoice'

const props = defineProps<{invoice: Invoice}>()
const route = useRoute()

// const invoice = toRefs(props.invoice)
const emit = defineEmits<{(e: 'InvoiceValues', invoice: Invoice): void}>()

const number = ref<string>('')
const installment = ref<boolean>(true)
const buy = ref<boolean>(false)
const installmentQuantity = ref<string | undefined>('3')
const prepayment = ref<string | undefined>('0')
const description = ref<string | undefined>('')

onMounted(() => { fetchData() })

const fetchData = async () => {
  const { id } = route.query
  if (id) {
    number.value = props.invoice?.number ? props.invoice.number : ''
    installment.value = props.invoice?.installment ? props.invoice.installment : true
    buy.value = props.invoice?.buy ? props.invoice.buy : false
    installmentQuantity.value = props.invoice?.installmentQuantity?.toString() ?? '3'
    prepayment.value = props.invoice?.prepayment?.toString() ?? '0'
    description.value = props.invoice?.description ? props.invoice.description : ''
  }
}

const handleCreateInvoice = () => {
  const temp: Invoice = {
    number: number.value,
    installment: installment.value,
    buy: buy.value,
    installmentQuantity: parseInt(installmentQuantity.value || ''),
    prepayment: parseInt(prepayment.value || ''),
    description: description.value
  }
  emit('InvoiceValues', temp)
}

// const filterCustomer = async (val: string, update: any): void => {
//   if (val === '') {
//     update(() => {
//       this.customersTemp = this.customers.map((v: Customer) => ({ value: v.id, label: v.name }))
//     })
//     return
//   }

//   update(async () => {
//     const needle = val.toLowerCase()
//     await this.$store.dispatch('customer/search', { needle })
//     const customers = await this.$store.getters['customer/customers']
//     this.customersTemp = customers
//       .filter((v: Customer) => v.name && v.name.toLowerCase().includes(needle))
//       .map((v: Customer) => ({ value: v.id, label: v.name }))
//   })
// }

// const handleCreateInvoice = () => {
//   const temp: Invoice = {
//     number: number.value,
//     installment: installment.value,
//     buy: buy.value,
//     installmentQuantity: parseInt(installmentQuantity.value || ''),
//     prepayment: parseInt(prepayment.value || ''),
//     description: description.value
//   }
//   emit('InvoiceValues', temp)
// }

// watch(() => invoice, () => { handleCreateInvoice() }, { immediate: true, deep: true })

// import { defineComponent, PropType } from 'vue'
// import { mapGetters } from 'vuex'
// import Tools from 'src/mixins/tools'
// import Jalaali from 'src/mixins/jalaali'

//   methods: {
//     async fetchData () {
//       const { id } = this.$route.query
//       if (id) {
//         await this.$store.dispatch('invoice/getInvoice', { id })
//         const invoice = await this.$store.getters['invoice/invoice']

//         if (invoice.buy) {
//           await this.$store.dispatch('vendor/getVendor', { id: invoice.vendorId })
//           const vendor = await this.$store.getters['vendor/vendor']
//           this.vendor = { value: vendor.id, label: vendor.name }
//         } else {
//           await this.$store.dispatch('customer/getCustomer', { id: invoice.customerId })
//           const customer = await this.$store.getters['customer/customer']
//           this.customer = { value: customer.id, label: customer.name }
//         }
//         await this.$store.dispatch('account/getAccount', { id: invoice.accountId })
//         const account = await this.$store.getters['account/account']
//         this.account = { value: account.id, label: account.name }
//         this.number = invoice?.number ?? ''
//         this.installment = invoice?.installment ?? true
//         this.buy = invoice?.buy ?? false
//         this.installmentQuantity = invoice?.installmentQuantity?.toString() ?? '3'
//         this.prepayment = invoice?.prepayment?.toString() ?? '0'
//         this.description = invoice?.description ?? ''
//       }

//       await this.$store.dispatch('customer/getCustomers')
//       await this.$store.dispatch('vendor/getVendors')
//       await this.$store.dispatch('account/getAccounts')
//       this.customersTemp = await this.customers
//         .map((v: Customer) => ({ value: v.id, label: v.name }))
//       this.vendorsTemp = await this.vendors
//         .map((v: Vendor) => ({ value: v.id, label: v.name }))
//       this.accountsTemp = await this.accounts
//         .map((v: Account) => ({ value: v.id, label: v.name }))
//     },

//     filterCustomer (val: string, update: any): void {
//       if (val === '') {
//         update(() => {
//           this.customersTemp = this.customers.map((v: Customer) => ({ value: v.id, label: v.name }))
//         })
//         return
//       }

//       update(async () => {
//         const needle = val.toLowerCase()
//         await this.$store.dispatch('customer/search', { needle })
//         const customers = await this.$store.getters['customer/customers']
//         this.customersTemp = customers
//           .filter((v: Customer) => v.name && v.name.toLowerCase().includes(needle))
//           .map((v: Customer) => ({ value: v.id, label: v.name }))
//       })
//     },

//     filterVendor (val: string, update: any): void {
//       if (val === '') {
//         update(() => {
//           this.vendorsTemp = this.vendors.map((v: Vendor) => ({ value: v.id, label: v.name }))
//         })
//         return
//       }

//       update(async () => {
//         const needle = val.toLowerCase()
//         await this.$store.dispatch('vendor/search', { needle })
//         const vendors = await this.$store.getters['vendor/vendors']
//         this.vendorsTemp = vendors
//           .filter((v: Vendor) => v.name.toLowerCase().includes(needle))
//           .map((v: Vendor) => ({ value: v.id, label: v.name }))
//       })
//     },

//     filterAccount (val: string, update: any): void {
//       if (val === '') {
//         update(() => {
//           this.accountsTemp = this.accounts.map((v: Account) => ({ value: v.id, label: v.name }))
//         })
//         return
//       }

//       update(async () => {
//         const needle = val.toLowerCase()
//         await this.$store.dispatch('account/search', { needle })
//         const accounts = await this.$store.getters['account/accounts']
//         this.accountsTemp = accounts
//           .filter((v: Account) => v.name.toLowerCase().includes(needle))
//           .map((v: Account) => ({ value: v.id, label: v.name }))
//       })
//     },

//     handleCreateInvoice () {
//       const invoice: Invoice = {
//         customerId: this.customer ? this.customer.value : undefined,
//         vendorId: this.vendor ? this.vendor.value : undefined,
//         number: this.number,
//         installment: this.installment,
//         buy: this.buy,
//         installmentQuantity: parseInt(this.installmentQuantity),
//         prepayment: parseInt(this.prepayment),
//         accountId: this.account ? this.account.value : undefined,
//         description: this.description
//       }

//       this.$emit('InvoiceValues', invoice)
//     }
//   }
// })
</script>
