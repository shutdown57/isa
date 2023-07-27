<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-btn
          color="primary"
          label="افزودن حساب"
          @click.prevent="() => router.push({ path: '/account/create' })"
        />
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h4 q-ml-md text-black">حساب‌ها</div>
        </div>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <q-markup-table separator="cell" dense flat>
          <thead>
            <tr>
              <th class="text-center">کد</th>
              <th class="text-center">نام</th>
              <th class="text-center">بانک</th>
              <th class="text-center">مقدار</th>
              <th class="text-center">شماره حساب</th>
              <th class="text-center">تاریخ ایجاد</th>
              <th class="text-center">تاریخ بروزرسانی</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in accounts" :key="account.id">
              <td class="text-center">{{ digitsEnToFa(account.id) }}</td>
              <td class="text-center">{{ account.name }}</td>
              <td class="text-center">{{ account.bank }}</td>
              <td class="text-center">{{ digitsEnToFa(addCommas(account.amount)) }}</td>
              <td class="text-center">{{ digitsEnToFa(account.accountNumber) }}</td>
              <td class="text-center">{{ digitsEnToFa(datetime(account.createdAt)) }}</td>
              <td class="text-center">{{ digitsEnToFa(datetime(account.updatedAt)) }}</td>
              <td class="text-center">
                <q-btn
                  color="info"
                  label="مشاهده"
                  @click.prevent="() => router.push({ path: '/account/show/' + account.id })"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'src/store'
import { digitsEnToFa, addCommas } from 'src/boot/persianTools'
import { datetime } from 'src/boot/jalaali'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const accounts = computed(() => store.getters['account/accounts'])

onMounted(() => {
  store.dispatch('account/getAccounts')
})
</script>
