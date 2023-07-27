<template>
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <q-input outlined dense v-model="name" label="نام حساب" />
          <q-input outlined dense v-model="bank" label="نام بانک" />
          <q-input outlined dense v-model="amount" label="موجودی" />
          <q-input outlined dense v-model="accountNumber" label="شماره حساب" />
          <q-input outlined dense v-model="description" label="توضیحات" type="textarea" />
          <q-btn color="secondary" label="ثبت" @click.prevent="handleCreateAccount" />
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="alert" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">اخطار</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          نام حساب, نام بانک و شماره حساب اجباری است
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
const bank = ref('')
const description = ref('')
const accountNumber = ref('')
const amount = ref('')
const alert = ref(false)

const handleCreateAccount = async () => {
  if (!name.value || !bank.value || !accountNumber.value) {
    alert.value = true
    return false
  }

  const account = {
    name: name.value,
    bank: bank.value,
    amount: parseInt(amount.value),
    accountNumber: accountNumber.value,
    description: description.value
  }

  await store.dispatch('account/createAccount', account)
  router.push({ path: '/account' })
}
</script>
