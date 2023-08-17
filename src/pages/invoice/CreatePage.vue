<template lang="html">
  <q-page>
    <!-- TODO: Add total amount -->

    <q-stepper v-model="step" vertical animated>
      <q-step :name="1" title="ایجاد فاکتور" icon="file-plus" :done="step > 1">
        <InvoiceBaseFormComponent
          :invoice="invoice"
          @InvoiceValues="handleCreateInvoice"
        />
      </q-step>

      <q-step :name="2" title="افزودن مشتری / فروشنده" icon="settings" :done="step > 2">
        <!-- NEW Form to store customer or vendor -->
        <InvoiceAccountCustomerVendorFormComponent
          :invoice="invoice"
          @SelectedValues="handleValues"
        />
      </q-step>

      <q-step :name="3" title="افزودن محصولات" icon="settings" :done="step > 3">
        <!-- Product form -->
        <div class="q-gutter-md column">
          <ProductsComponent :invoice="invoice" @total-amount="handleTotalAmount" />
        </div>
      </q-step>
    </q-stepper>

    <!-- <q-card v-if="invoice && invoice.id" class="justify-center"> -->
    <!--   <q-card-section> -->
    <!--     <div class="q-gutter-md column"> -->
    <!--       <ProductsComponent :invoice="invoice" /> -->
    <!--     </div> -->
    <!--   </q-card-section> -->
    <!-- </q-card> -->

    <q-dialog v-model="alert" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">اخطار</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          وارد کردن شماره فاکتور الزامی است
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-red">
          <q-btn flat label="خب" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { Invoice } from 'src/interface/invoice'
import ProductsComponent from 'src/components/ProductsComponent.vue'
import InvoiceBaseFormComponent from 'src/components/forms/InvoiceBaseFormComponent.vue'
import InvoiceAccountCustomerVendorFormComponent from 'src/components/forms/InvoiceAccountCustomerVendorFormComponent.vue'
import { ref, watch, onMounted, computed } from 'vue'
import { useStore } from 'src/store'
import { useRoute, useRouter } from 'vue-router'

const alert = ref(false)
const step = ref(1)

const store = useStore()
const router = useRouter()
const route = useRoute()

const invoice = computed(() => store.getters['invoice/invoice'])

watch(route.query, (value) => {
  if (value && value.id) {
    store.dispatch('invoice/getInvoice', { id: value.id })
  }
})

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  const { id } = route.query
  if (id) {
    await store.dispatch('invoice/getInvoice', { id })
  }
  await store.dispatch('customer/getCustomers')
  await store.dispatch('account/getAccounts')
}

const handleCreateInvoice = async ($event?: Invoice) => {
  if (!$event) return false

  if (!$event.number) {
    alert.value = true
    return false
  }

  if (invoice.value && invoice.value.id) {
    await store.dispatch('invoice/updateInvoice', {
      id: invoice.value.id,
      ...$event
    })
    // FIXME: Error [vuex] unknown action type: installment/setInstallments
    await store.dispatch('installment/setInstallments')
  } else {
    await store.dispatch('invoice/createInvoice', $event)
  }
  router.push({ path: '/invoice/create', query: { id: invoice.value.id } })
  step.value = 2
}

const handleValues = async (
  $event?: {
    customer: { id?: number, name?: string },
    vendor: { id?: number, name?: string },
    account: { id?: number, name?: string }
  }
) => {
  const payload = {
    id: invoice.value.id,
    accountId: $event?.account?.id ? $event.account.id : undefined,
    customerId: $event?.customer?.id ? $event.customer.id : undefined,
    vendorId: $event?.vendor?.id ? $event.vendor.id : undefined
  }
  await store.dispatch('invoice/updateInvoice', payload)
  // await store.dispatch('installment/setInstallments', {
  //   id: invoice.value.id
  // })
  step.value = 3
}

const handleTotalAmount = async ($event?: number) => {
  if (!$event) return
  await store.dispatch('invoice/updateInvoice', {
    id: invoice.value.id,
    totalAmount: $event
  })
  router.push({ path: `/invoice/show/${invoice.value.id}` })
}
</script>
