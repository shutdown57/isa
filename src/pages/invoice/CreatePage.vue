<template lang="html">
  <q-page>
    <!-- TODO: Add total amount -->
    <InvoiceFormComponent :invoice="invoice" :total-amount="0" @InvoiceValues="handleCreateInvoice" />

    <q-card v-if="invoice && invoice.id" class="justify-center">
      <q-card-section>
        <div class="q-gutter-md column">
          <ProductsComponent :invoice="invoice" />
        </div>
      </q-card-section>
    </q-card>

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
import InvoiceFormComponent from 'src/components/forms/InvoiceFormComponent.vue'
import { ref, watch, onMounted, computed } from 'vue'
import { useStore } from 'src/store'
import { useRoute, useRouter } from 'vue-router'

const alert = ref(false)

const store = useStore()
const router = useRouter()
const route = useRoute()

const invoice = computed((): Invoice => store.getters['invoice/invoice'])

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

const handleCreateInvoice = async (data: Invoice) => {
  if (!data.number) {
    alert.value = true
    return false
  }

  if (invoice.value && invoice.value.id) {
    await store.dispatch('invoice/updateInvoice', {
      id: invoice.value.id,
      ...data
    })
  } else {
    await store.dispatch('invoice/createInvoice', data)
  }
  router.push({ path: '/invoice/create', query: { id: invoice.value.id } })
}
</script>
