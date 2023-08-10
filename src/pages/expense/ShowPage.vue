<template lang="html">
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <p>
            <strong>کد: </strong> {{ digitsEnToFa(String(expense.id)) }}
          </p>
          <p>
            <strong>عنوان: </strong> {{ expense.title }}
          </p>
          <p>
            <strong>نام حساب: </strong> {{ expense?.account?.name }}
          </p>
          <p>
            <strong>مبلغ: </strong> {{ digitsEnToFa(addCommas(expense.amount)) }}
          </p>
          <p>
            <strong>توضیحات: </strong> {{ expense.description }}
          </p>
          <p>
            <strong>تاریخ ایجاد: </strong> {{ digitsEnToFa(datetime(expense.createdAt)) }}
          </p>
          <p>
            <strong>تاریخ بروزرسانی: </strong> {{ digitsEnToFa(datetime(expense.updatedAt)) }}
          </p>
          <q-btn
            color="warning"
            label="ویرایش"
            @click.prevent="() => router.push({ path: `/expense/show/${expense.id}/edit` })"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'src/store'
import { useRouter, useRoute } from 'vue-router'
import { digitsEnToFa, addCommas } from 'src/boot/persianTools'
import { datetime } from 'src/boot/jalaali'

const store = useStore()
const route = useRoute()
const router = useRouter()

const expense = computed(() => store.getters['expense/expense'])

onMounted(async () => {
  await store.dispatch('expense/getExpense', route.params.expenseId)
})
</script>
