<template>
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <q-input outlined dense v-model="name" label="نام محصول" />
          <q-input outlined dense v-model="description" label="توضیحات محصول" type="textarea" />
          <q-input outlined dense v-model="price" label="قیمت" />
          <q-btn color="secondary" label="ثبت" @click.prevent="handleUpdateProduct" />
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
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'src/store'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

const name = ref('')
const description = ref('')
const price = ref(0)
const quantity = ref(0)
const alert = ref(false)

const product = computed(() => store.getters['product/product'])

onMounted(async () => {
  await store.dispatch('product/getProduct', { id: route.params.productId })
  name.value = product.value.name
  description.value = product.value.description
  price.value = +product.value.price
  quantity.value = +product.value.quantity
})

const handleUpdateProduct = async () => {
  if (!name.value) {
    alert.value = true
    return false
  }
  const payload = {
    id: product.value.id,
    name: name.value,
    description: description.value,
    price: +price.value || 0,
    quantity: +quantity.value || 0
  }

  await store.dispatch('product/update', payload)
  router.push({ path: '/product' })
}
</script>
