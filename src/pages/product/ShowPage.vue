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
            <strong>قیمت: </strong> {{ digitsEnToFa(addCommas(product.price)) }}
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
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'src/store'
import { useRoute, useRouter } from 'vue-router'
import { digitsEnToFa, addCommas } from 'src/boot/persianTools'
import { datetime } from 'src/boot/jalaali'

const store = useStore()
const route = useRoute()
const router = useRouter()

const product = computed(() => store.getters['product/product'])

onMounted(() => store.dispatch('product/getProduct', { id: route.params.productId }))
</script>
