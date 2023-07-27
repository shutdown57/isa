<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-btn color="primary" label="افزودن مشتری" @click.prevent="() => $router.push({ path: '/customer/create' })" />
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <q-markup-table separator="cell" dense flat>
          <thead>
            <tr>
              <th class="text-center">کد</th>
              <th class="text-center">نام</th>
              <th class="text-center">تلفن</th>
              <th class="text-center">آدرس</th>
              <th class="text-center">تاریخ ایجاد</th>
              <th class="text-center">تاریخ بروزرسانی</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.id">
              <td class="text-center">{{ digitsEnToFa(customer.id) }}</td>
              <td class="text-center">{{ customer.name }}</td>
              <td class="text-center">{{ customer.phone }}</td>
              <td class="text-center">{{ customer.address }}</td>
              <td class="text-center">{{ digitsEnToFa(datetime(customer.createdAt)) }}</td>
              <td class="text-center">{{ digitsEnToFa(datetime(customer.updatedAt)) }}</td>
              <td class="text-center">
                <q-btn color="info" label="مشاهده"
                  @click.prevent="() => router.push({ path: '/customer/show/' + customer.id })" />
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

const customers = computed(() => store.getters['customer/customers'])

onMounted(() => {
  store.dispatch('customer/getCustomers')
})
</script>
