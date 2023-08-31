<template lang="html">
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <p>
            <strong>کد: </strong> {{ vendor.id }}
          </p>
          <p>
            <strong>نام: </strong> {{ vendor.name }}
          </p>
          <p>
            <strong>تلفن: </strong> {{ vendor.phone }}
          </p>
          <p>
            <strong>توضیحات: </strong> {{ vendor.description }}
          </p>
          <p>
            <strong>تاریخ ایجاد: </strong> {{ digitsEnToFa(datetime(vendor.createdAt)) }}
          </p>
          <p>
            <strong>تاریخ بروزرسانی: </strong> {{ digitsEnToFa(datetime(vendor.updatedAt)) }}
          </p>
          <q-btn
            color="warning"
            label="ویرایش"
            @click.prevent="() => router.push({ path: '/vendor/edit/' + vendor.id })"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-card class="row justify-center">
      <q-card-section v-if="vendor.invoices && vendor.invoices.length > 0">
        <q-markup-table separator="cell" dense flat>
          <thead>
            <tr>
              <th class="text-center">کد</th>
              <th class="text-center">شماره</th>
              <th class="text-center">مبلغ</th>
              <th class="text-center">پیش پرداخت</th>
              <th class="text-center">تاریخ ایجاد</th>
              <th class="text-center">تاریخ بروزرسانی</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="invoice in vendor.invoices" :key="invoice.id">
              <td class="text-center">{{ digitsEnToFa(invoice.id) }}</td>
              <td class="text-center">{{ invoice.number }}</td>
              <td class="text-center">{{ digitsEnToFa(addCommas(`${invoice.totalAmount}`)) }}</td>
              <td :class="[ 'text-center', invoice.prepayment !== invoice.totalAmount ? 'bg-red' : 'bg-green' ]">
                {{ digitsEnToFa(addCommas(`${invoice.prepayment}`)) }}
              </td>
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

      <q-card-section v-else>
        <span>فاکتور موجود نیست.</span>
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

const vendor = computed(() => store.getters['vendor/vendor'])

onMounted(() => {
  store.dispatch('vendor/getVendor', {
    id: route.params.vendorId
  })
})
</script>
