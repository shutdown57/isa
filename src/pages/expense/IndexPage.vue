<template lang="html">
  <q-page>
    <q-card>
      <q-card-section>
        <q-btn
          color="primary"
          label="افزودن هزینه"
          @click.prevent="() => router.push({ path: '/expense/create' })"
        />
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <q-markup-table separator="cell" dense flat>
          <thead>
            <tr>
              <th class="text-center">کد</th>
              <th class="text-center">حساب</th>
              <th class="text-center">عنوان</th>
              <th class="text-center">مبلغ</th>
              <th class="text-center">تاریخ ایجاد</th>
              <th class="text-center">تاریخ بروزرسانی</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="expense in expenses" :key="expense.id">
              <td class="text-center">{{ digitsEnToFa(expense.id) }}</td>
              <td class="text-center">{{ expense?.account?.name }}</td>
              <td class="text-center">{{ expense.title }}</td>
              <td class="text-center">{{ digitsEnToFa(addCommas(`${expense.amount}`)) }}</td>
              <td class="text-center">{{ digitsEnToFa(datetime(expense.createdAt)) }}</td>
              <td class="text-center">{{ digitsEnToFa(datetime(expense.updatedAt)) }}</td>
              <td class="text-center">
                <q-btn
                  color="info"
                  label="مشاهده"
                  @click.prevent="() => router.push({ path: '/expense/show/' + expense.id })"
                />

                <q-btn
                  color="negative"
                  label="حذف"
                  @click.prevent="handleRemove(expense)"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>

    <q-card>
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
import { computed, watch, ref, onMounted } from 'vue'
import { digitsEnToFa, addCommas } from 'src/boot/persianTools'
import { datetime } from 'src/boot/jalaali'
import { useStore } from 'src/store'
import { useRouter, useRoute } from 'vue-router'
import { Expense } from 'src/interface/expense'

const store = useStore()
const router = useRouter()
const route = useRoute()

const current = ref(1)
const limit = ref(20)
const offset = ref(0)

const page = computed({
  get () {
    return current.value
  },
  set (value) {
    current.value = value
  }
})
const expenses = computed(() => store.getters['expense/expenses'])
const count = computed(() => store.getters['expense/count'])
const totalPages = computed(() => {
  const result = count.value % 20
  const total = parseInt(`${count.value / 20}`)
  return result > 0 ? (total + 1) : total
})

onMounted(async () => {
  await fetchData()
})

watch(current, (value) => {
  limit.value = value * 20
  offset.value = limit.value > 0 ? limit.value - 20 : 0
  store.dispatch('expense/getExpenses', {
    limit: limit.value,
    offset: offset.value
  })
  router.push({
    query: {
      limit: limit.value,
      offset: offset.value,
      page: current.value
    }
  })
})

const fetchData = async () => {
  const { limit: l, offset: o, page: p } = route.query
  if (l) limit.value = parseInt(`${l}`)
  if (o) offset.value = parseInt(`${o}`)
  if (p) current.value = parseInt(`${p}`)
  await store.dispatch('expense/getExpenses', {
    limit: limit.value,
    offset: offset.value
  })
  await store.dispatch('expense/count')
}

const handleRemove = async (expense: Expense) => {
  const { id, amount, accountId } = expense
  await store.dispatch('account/amount', {
    id: accountId,
    amount: amount
  })
  await store.dispatch('expense/remove', id)
  await fetchData()
}
</script>
