<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-btn
          color="primary"
          label="افزودن محصول"
          @click.prevent="() => router.push({ path: '/product/create' })"
        />
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <q-markup-table separator="cell" dense flat>
          <thead>
            <tr>
              <th class="text-center">کد</th>
              <th class="text-center">نام</th>
              <th class="text-center">قیمت خرید</th>
              <th class="text-center">قیمت فروش</th>
              <th class="text-center">تعداد</th>
              <th class="text-center">تاریخ ایجاد</th>
              <th class="text-center">تاریخ بروزرسانی</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td class="text-center">{{ digitsEnToFa(product.id) }}</td>
              <td class="text-center">{{ product.name }}</td>
              <td class="text-center">{{ digitsEnToFa(String(product?.price?.buy ?? 0)) }}</td>
              <td class="text-center">{{ digitsEnToFa(String(product?.price?.sell ?? 0)) }}</td>
              <td class="text-center">{{ digitsEnToFa(String(product.quantity)) }}</td>
              <td class="text-center">{{ digitsEnToFa(datetime(product.createdAt)) }}</td>
              <td class="text-center">{{ digitsEnToFa(datetime(product.updatedAt)) }}</td>
              <td class="text-center">
                <q-btn
                  color="info"
                  label="مشاهده"
                  @click.prevent="routeToShowPage(product.id)"
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
import { digitsEnToFa } from 'src/boot/persianTools'
import { datetime } from 'src/boot/jalaali'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const products = computed(() => store.getters['product/products'])

onMounted(() => { store.dispatch('product/getProducts') })

const routeToShowPage = (id: number) => {
  router.push({ path: `/product/show/${id}` })
}
</script>
