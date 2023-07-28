<template>
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <q-input outlined dense v-model="name" label="نام حساب" />
          <q-input outlined dense v-model="phone" label="تلفن" />
          <q-input outlined dense v-model="description" label="توضیحات" type="textarea" />
          <q-btn color="secondary" label="ثبت" @click.prevent="handleCreateVendor" />
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="alert" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">اخطار</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          نام و شماره تلفن اجباری است
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
const phone = ref('')
const alert = ref(false)

const handleCreateVendor = async () => {
  if (!name.value || !phone.value) {
    alert.value = true
    return false
  }

  const payload = {
    name: name.value,
    phone: phone.value,
    description: description.value
  }

  await store.dispatch('vendor/createVendor', payload)
  router.push({ path: '/vendor' })
}
</script>
