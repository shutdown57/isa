<template>
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <q-input outlined dense v-model="name" label="نام محصول" />
          <q-input outlined dense v-model="description" label="توضیحات محصول" type="textarea" />
          <q-input outlined dense v-model="priceBuy" label="قیمت خرید محصول" />
          <q-input outlined dense v-model="priceSell" label="قیمت فروش محصول" />
          <q-btn color="secondary" label="ثبت" @click.prevent="handleCreateProduct" />
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="alert" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">اخطار</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          وارد کردن نام محصول اجباری است
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-red">
          <q-btn flat label="خب" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'src/store'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const name = ref('')
const description = ref('')
const priceBuy = ref(0)
const priceSell = ref(0)
const quantity = ref(0)
const alert = ref(false)

const handleCreateProduct = async () => {
  if (!name.value) {
    alert.value = true
    return false
  }
  const product = {
    name: name.value,
    description: description.value,
    priceBuy: +priceBuy.value || 0,
    priceSell: +priceSell.value || 0,
    quantity: +quantity.value || 0
  }

  await store.dispatch('product/createProduct', product)
  router.push({ path: '/product' })
}
</script>
