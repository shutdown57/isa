<template lang="html">
  <q-page>
    <q-card flat bordered class="row">
      <q-card-section class="col">
        <p dir="rtl">
          <strong>شماره: </strong> {{ invoice.number }}
        </p>
      </q-card-section>

      <q-separator vertical />

      <q-card-section class="col">
        <p dir="rtl">
          <strong v-if="invoice.buy">فاکتور فروش: </strong>
          <strong v-else>فاکتور خرید: </strong>
          <q-icon name="check" color="success" />
        </p>

        <p dir="rtl">
          <strong>فروشنده: </strong> {{ invoice.vendor?.name }}
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useStore } from 'src/store'
import { Invoice } from 'src/interface/invoice'
import { computed, onMounted } from 'vue'

const route = useRoute()
const store = useStore()

const invoice = computed((): Invoice => store.getters['invoice/invoice'])

onMounted(() => { fetchData() })

const fetchData = async () => {
  const { invoiceId } = route.params
  try {
    await store.dispatch('invoice/getInvoice', { id: invoiceId })
  } catch (err) {
    console.error(err)
  }
}
</script>
