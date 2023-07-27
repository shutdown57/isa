<template lang="html">
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <p>
            <strong>کد: </strong> {{ account.id }}
          </p>
          <p>
            <strong>نام: </strong> {{ account.name }}
          </p>
          <p>
            <strong>بانک: </strong> {{ account.bank }}
          </p>
          <p>
            <strong>مقدار: </strong> {{ digitsEnToFa(addCommas(account.amount)) }}
          </p>
          <p>
            <strong>شماره حساب: </strong> {{ account.accountNumber }}
          </p>
          <p>
            <strong>توضیحات: </strong> {{ account.description }}
          </p>
          <p>
            <strong>تاریخ ایجاد: </strong> {{ digitsEnToFa(datetime(account.createdAt)) }}
          </p>
          <p>
            <strong>تاریخ بروزرسانی: </strong> {{ digitsEnToFa(datetime(account.updatedAt)) }}
          </p>
          <!-- TODO: Add edit account -->
          <q-btn
            color="warning"
            label="ویرایش"
            @click.prevent="() => router.push({ path: '/account/edit/' + account.id })"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-card class="row justify-center">
      <q-card-section>
        <!-- TODO: Add account invoices -->
        A table of account invoices
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'src/store'
import { digitsEnToFa, addCommas } from 'src/boot/persianTools'
import { datetime } from 'src/boot/jalaali'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()

const account = computed(() => store.getters['account/account'])

onMounted(() => {
  store.dispatch('account/getAccount', {
    id: route.params.accountId
  })
})
</script>
