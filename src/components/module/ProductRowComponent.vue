<template lang="html">
  <div class="row q-my-sm items-center" dir="rtl">
    <div class="col-1" v-text="digitsEnToFa(`${(props.index ?? 1) + 1}`)"></div>

    <div class="col-6">
        <!-- v-model="productSelected" -->
        <!-- @filter="filterProduct" -->
      {{ product }}
      <q-select
        v-model="product"
        use-input
        input-debounce="700"
        label="انتخاب محصول"
        behavior="menu"
        dense
        outlined
        :options="products"
        option-value="id"
        option-label="name"
      >
        <template #no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <div class="col-1">
      <q-input outlined dense v-model="quantity" label="تعداد" />
    </div>

    <div class="col-1">
      <q-input outlined dense v-model="price" label="قیمت" />
    </div>

    <div class="col-2">
      <q-field square filled dense>
        <template v-slot:prepend>
          <q-icon name="payments" />
        </template>

        <template v-slot:control>
          <div class="self-center full-width no-outline">
            {{ digitsEnToFa(addCommas(amount)) }}
          </div>
        </template>
      </q-field>
    </div>

    <div class="col-1">
      <q-btn icon="delete" color="red" @click.prevent="remove" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { addCommas, digitsEnToFa } from 'src/boot/persianTools'
import { ProductRow, SelectedPrice, SelectedQuantity } from 'src/interface/product'
import { computed, onMounted, inject } from 'vue'
import { useStore } from 'src/store'

const props = defineProps<{product: ProductRow, index: number}>()

const store = useStore()

const emit = defineEmits<{(e: 'RowDelete', index: number): void
  (e: 'PriceValue', { price, index }: SelectedPrice): void
  (e: 'QuantityValue', { quantity, index }: SelectedQuantity): void
  (e: 'ProductValue', { id, index }: ProductRow): void}>()

const amount = computed(() => (props.product?.price ?? 0) * (props.product?.quantity ?? 0))
const products = computed(() => {
  return store.getters['product/products']
})
const price = computed({
  get () {
    return props.product?.price
  },
  set (value) {
    if (!value) value = 0
    const payload: SelectedPrice = {
      price: value,
      index: props.index
    }
    emit('PriceValue', payload)
  }
})
const quantity = computed({
  get () {
    return props.product?.quantity
  },
  set (value) {
    if (!value) value = 0
    const payload: SelectedQuantity = {
      quantity: value,
      index: props.index
    }
    emit('QuantityValue', payload)
  }
})
const product = computed({
  get () {
    if (Object.keys(props.product).length < 1) {
      return { id: 0, name: '' }
    }
    return props.product
  },
  set (p: ProductRow) {
    if (!p) return
    const payload: ProductRow = {
      id: p.id,
      name: p.name,
      index: props.index
    }
    emit('ProductValue', payload)
  }
})

onMounted(() => {
  fetchData()
})

const fetchData = async (): Promise<void> => {
  await store.dispatch('product/getProducts')
}

const remove = () => {
  emit('RowDelete', props.index)
}
</script>
