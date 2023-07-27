<template>
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <q-input outlined dense v-model="name" label="نام و نام خانوادگی" />
          <q-input outlined dense v-model="phone" label="شماره تلفن" />
          <q-input outlined dense v-model="address" label="آدرس" type="textarea" />
          <q-input outlined dense v-model="description" label="توضیحات" type="textarea" />
          <q-btn color="secondary" label="ثبت" @click.prevent="handleUpdateCustomer" />
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="alert" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">اخطار</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          وارد کردن نام و شماره تلفن اجباری است
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-red">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'src/store'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()

const name = ref('')
const phone = ref('')
const address = ref('')
const description = ref('')
const alert = ref(false)

const customer = computed(() => store.getters['customer/customer'])

onMounted(async () => {
  await store.dispatch('customer/getCustomer', {
    id: route.params.customerId
  })
  name.value = customer.value.name
  phone.value = customer.value.phone
  address.value = customer.value.address
  description.value = customer.value.description
})

const handleUpdateCustomer = async () => {
  if (!name.value || !phone.value) {
    alert.value = true
    return false
  }

  const payload = {
    id: route.params.customerId,
    name: name.value,
    phone: phone.value,
    address: address.value,
    description: description.value
  }

  await store.dispatch('customer/update', payload)
  router.push({ path: '/customer' })
}
</script>
