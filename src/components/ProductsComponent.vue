<template lang="html">
  <div>
    <ProductRowComponent
      v-for="(product, index) in products"
      :key="`${invoice.id}-${index}`"
      :index="index"
      :product="product"
      @row-delete="handleRowDelete"
      @price-value="handlePriceValue"
      @product-value="handleProductValue"
      @quantity-value="handleQuantityValue"
    />

    <div class="q-my-md">
      <q-btn color="primary" icon="add" @click.prevent="handleAddRow" />
    </div>

    <div>
      <q-btn color="secondary" label="ثبت محصولات" @click.prevent="handleAddProduct" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductRowComponent from 'components/module/ProductRowComponent.vue'
import { ProductRow, SelectedPrice, SelectedQuantity, SelectedProduct } from 'src/interface/product'
import { Invoice } from 'src/interface/invoice'
import { onMounted, reactive, toRefs } from 'vue'
import { QSpinnerGears, useQuasar } from 'quasar'
import { useStore } from 'src/store'

const store = useStore()
const $q = useQuasar()
const emit = defineEmits<{(e: 'TotalAmount', totalAmount: number): void}>()

const products = reactive<Array<ProductRow>>([])
const props = defineProps<{invoice: Invoice}>()
const invoice = toRefs<Invoice>(props.invoice)

onMounted(() => { fetchData() })

const fetchData = async () => {
  if (invoice.products?.value && invoice.products?.value?.length > 0) {
    products.push(...invoice.products.value)
  } else {
    const product: ProductRow = {}
    products.push(product)
  }
}

const handleProductValue = ($event?: SelectedProduct) => {
  if (!$event) return

  try {
    const product = products.find((_, i) => i === $event.index)
    if (product) {
      product.id = $event.id
      product.name = $event.name
      products[$event.index] = product
    }
  } catch (err) {}
}

const handlePriceValue = ($event?: SelectedPrice) => {
  if (!$event) return

  try {
    const product = products.find((_, i) => i === $event.index)
    if (product) {
      product.price = $event.price
      products[$event.index] = product
    }
  } catch (err) {}
}

const handleQuantityValue = ($event?: SelectedQuantity) => {
  if (!$event) return

  try {
    const product = products.find((_, i) => i === $event.index)
    if (product) {
      product.quantity = $event.quantity
      products[$event.index] = product
    }
  } catch (err) {}
}

const handleAddRow = async () => {
  const product: ProductRow = {}
  products.push(product)
}

const handleAddProduct = async () => {
  $q.notify({
    progress: true,
    message: 'در حال ذخیره سازی...',
    spinner: QSpinnerGears
  })
  await store.dispatch('invoice/upsertProducts', {
    id: invoice.id?.value,
    prepayment: invoice.prepayment?.value,
    installment: invoice.installment?.value,
    installmentQuantity: invoice.installmentQuantity?.value,
    products
  })
  let totalAmount = 0
  products.forEach(v => { totalAmount += (parseInt(`${v.price || '0'}`) * parseInt(`${v.quantity || '0'}`)) })
  emit('TotalAmount', totalAmount)
}

const handleRowDelete = ($event?: number) => {
  if ($event === undefined || $event === null) return
  products.splice($event, 1)
}
</script>
