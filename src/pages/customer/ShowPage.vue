<template lang="html">
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <p>
            <strong>کد: </strong> {{ customer.id }}
          </p>
          <p>
            <strong>نام: </strong> {{ customer.name }}
          </p>
          <p>
            <strong>تلفن: </strong> {{ customer.phone }}
          </p>
          <p>
            <strong>شهر: </strong> {{ customer.city ?? '---' }}
          </p>
          <p>
            <strong>آدرس: </strong> {{ customer.address ?? '---' }}
          </p>
          <p>
            <strong>توضیحات: </strong> {{ customer.description }}
          </p>
          <p>
            <strong>تاریخ ایجاد: </strong> {{ digitsEnToFa(datetime(customer.createdAt)) }}
          </p>
          <p>
            <strong>تاریخ بروزرسانی: </strong> {{ digitsEnToFa(datetime(customer.updatedAt)) }}
          </p>
          <!-- TODO: Add edit customer -->
          <q-btn
            color="warning"
            label="ویرایش"
            @click.prevent="router.push({ path: `/customer/show/${customer.id}/edit` })"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-card v-if="customer.representative" class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <p>
            <strong>کد: </strong> {{ customer.representative.id }}
          </p>
          <p>
            <strong>نام: </strong> {{ customer.representative.name }}
          </p>
          <p>
            <strong>تلفن: </strong> {{ customer.representative.phone }}
          </p>
          <!-- TODO: Add show customer representative -->
          <q-btn
            color="info"
            label="مشاهده"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-card v-if="customer.presents && customer.presents.length > 0">
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
            <tr v-for="present in customer.presents" :key="present.id">
              <td class="text-center">{{ digitsEnToFa(present.id) }}</td>
              <td class="text-center">{{ present.name }}</td>
              <td class="text-center">{{ present.phone }}</td>
              <td class="text-center">{{ present.address }}</td>
              <td class="text-center">{{ digitsEnToFa(datetime(present.createdAt)) }}</td>
              <td class="text-center">{{ digitsEnToFa(datetime(present.updatedAt)) }}</td>
              <td class="text-center">
                <q-btn
                  color="info"
                  label="مشاهده"
                  @click.prevent="() => router.push({ path: '/customer/show/' + present.id })"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>

    <q-card class="row justify-center">
      <q-card-section>
        <!-- TODO: Add customer installments -->
        A table of customer installments
      </q-card-section>
    </q-card>

    <q-card class="row justify-center">
      <q-card-section>
        <!-- TODO: Add customer invoices -->
        A table of customer invoices
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'src/store'
import { digitsEnToFa } from 'src/boot/persianTools'
import { datetime } from 'src/boot/jalaali'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()

const customer = computed(() => store.getters['customer/customer'])

onMounted(() => {
  store.dispatch('customer/getCustomer', {
    id: route.params.customerId
  })
})
</script>
