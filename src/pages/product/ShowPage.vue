<template lang="html">
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <p>
            <strong>کد: </strong> {{ digitsEnToFa(String(product.id)) }}
          </p>
          <p>
            <strong>نام: </strong> {{ product.name }}
          </p>
          <p>
            <strong>قیمت خرید: </strong> {{ digitsEnToFa(addCommas(product?.price?.buy)) }}
          </p>
          <p>
            <strong>قیمت فروش: </strong> {{ digitsEnToFa(addCommas(product?.price?.sell)) }}
          </p>
          <p>
            <strong>تعداد: </strong> {{ digitsEnToFa(String(product.quantity)) }}
          </p>
          <p>
            <strong>توضیحات: </strong> {{ product.description }}
          </p>
          <p>
            <strong>تاریخ ایجاد: </strong> {{ digitsEnToFa(datetime(product.createdAt)) }}
          </p>
          <p>
            <strong>تاریخ بروزرسانی: </strong> {{ digitsEnToFa(datetime(product.updatedAt)) }}
          </p>
          <q-btn
            color="warning"
            label="ویرایش"
            @click.prevent="() => router.push({ path: `/product/show/${product.id}/edit` })"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-card class="row">
      <q-card-section class="w-100">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="sell" label="فروش" />
          <q-tab name="buy" label="خرید" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="sell">
            <div class="text-h6">فروش</div>
            <q-markup-table separator="cell" flat bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>شماره فاکتور</th>
                  <th>هزینه کل</th>
                  <th>نام مشتری</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(invoice, index) in product.invoices" :key="`invoice-${invoice.id}`">
                  <td>{{ digitsEnToFa(index + 1) }}</td>
                  <td>{{ digitsEnToFa(addCommas(invoice.number)) }}</td>
                  <td>{{ digitsEnToFa(addCommas(invoice?.totalAmount)) }}</td>
                  <td>{{ invoice?.customer?.name }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-tab-panel>

          <q-tab-panel name="buy">
            <div class="text-h6">خرید</div>
            <q-markup-table separator="cell" flat bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>شماره فاکتور</th>
                  <th>هزینه کل</th>
                  <th>نام فروشنده</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(invoice, index) in product.invoices" :key="`invoice-${invoice.id}`">
                  <td>{{ digitsEnToFa(index + 1) }}</td>
                  <td>{{ digitsEnToFa(addCommas(invoice?.number)) }}</td>
                  <td>{{ digitsEnToFa(addCommas(invoice?.totalAmount)) }}</td>
                  <td>{{ invoice?.vendor?.name }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'src/store'
import { useRoute, useRouter } from 'vue-router'
import { digitsEnToFa, addCommas } from 'src/boot/persianTools'
import { datetime } from 'src/boot/jalaali'

const store = useStore()
const route = useRoute()
const router = useRouter()

const tab = ref<string>('sell')

const product = computed(() => store.getters['product/product'])

onMounted(() => store.dispatch('product/getProduct', { id: route.params.productId }))
</script>

<style scoped>
.w-100 {
  min-width: 100%;
}
</style>
