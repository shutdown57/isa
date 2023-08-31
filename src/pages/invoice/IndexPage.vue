<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-btn
          color="primary"
          label="افزودن فاکتور"
          @click.prevent="() => router.push({ path: '/invoice/create' })"
        />

        <q-separator vertical inset />

        <q-toggle :label="`نمایش فاکتورهای ${buy ? 'خرید' : 'فروش'}`" v-model="buy" />
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <q-markup-table separator="cell" dense flat>
          <thead>
            <tr>
              <th class="text-center">کد</th>
              <th class="text-center">شماره</th>
              <th class="text-center">مبلغ</th>
              <th class="text-center">پیش پرداخت</th>
              <th class="text-center">نام مشتری</th>
              <th class="text-center">تاریخ ایجاد</th>
              <th class="text-center">تاریخ بروزرسانی</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="invoice in invoices" :key="invoice.id">
              <td class="text-center">{{ digitsEnToFa(invoice.id) }}</td>
              <td class="text-center">{{ digitsEnToFa(invoice.number) }}</td>
              <td class="text-center">{{ digitsEnToFa(addCommas(`${invoice.totalAmount}`)) }}</td>
              <td :class="[ 'text-center', invoice.prepayment !== invoice.totalAmount ? 'bg-red' : 'bg-green' ]">
                {{ digitsEnToFa(addCommas(`${invoice.prepayment}`)) }}
              </td>
              <td class="text-center">{{ invoice?.customer?.name }}</td>
              <td class="text-center">{{ digitsEnToFa(datetime(invoice.createdAt)) }}</td>
              <td class="text-center">{{ digitsEnToFa(datetime(invoice.updatedAt)) }}</td>
              <td class="text-center">
                <q-btn
                  color="info"
                  label="مشاهده"
                  @click.prevent="() => router.push({ path: '/invoice/show/' + invoice.id })"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>

      <q-card-section class="row justify-center">
        <q-pagination
          v-model="page"
          :max="totalPages"
          direction-links
          flat
          color="grey"
          active-color="primary"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { digitsEnToFa, addCommas } from 'src/boot/persianTools'
import { datetime } from 'src/boot/jalaali'
import { useStore } from 'src/store'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()

const current = ref<number>(1)
const limit = ref<number>(20)
const offset = ref<number>(0)
const buy = ref<boolean>(false)

const page = computed({
  get () {
    return current.value
  },
  set (value) {
    current.value = value
  }
})
const totalPages = computed(() => {
  const result = invoiceCount.value % 20
  const total = parseInt(`${invoiceCount.value / 20}`)
  return result > 0 ? (total + 1) : total
})
const invoices = computed(() => store.getters['invoice/invoices'])
const invoiceCount = computed(() => store.getters['invoice/count'])

onMounted(() => {
  const { limit: l, offset: o, page: p, buy: b } = route.query
  if (l) limit.value = parseInt(`${l}`)
  if (o) offset.value = parseInt(`${o}`)
  if (p) current.value = parseInt(`${p}`)
  if (b) buy.value = parseInt(`${b}`) === 1
  store.dispatch('invoice/getSellInvoices', {
    limit: limit.value,
    offset: offset.value,
    buy: buy.value
  })
  store.dispatch('invoice/count')
})

watch(current, (value) => {
  limit.value = value * 20
  offset.value = limit.value > 0 ? limit.value - 20 : 0
  store.dispatch('invoice/getSellInvoices', {
    limit: limit.value,
    offset: offset.value,
    buy: buy.value
  })
  router.push({
    query: {
      limit: limit.value,
      offset: offset.value,
      page: current.value,
      buy: buy.value ? 1 : 0
    }
  })
})

watch(buy, (value) => {
  limit.value = current.value * 20
  offset.value = limit.value > 0 ? limit.value - 20 : 0
  store.dispatch('invoice/getSellInvoices', {
    limit: limit.value,
    offset: offset.value,
    buy: value
  })
  router.push({
    query: {
      limit: limit.value,
      offset: offset.value,
      page: current.value,
      buy: value ? 1 : 0
    }
  })
})
</script>
