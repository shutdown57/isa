<template lang="html">
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <q-input outlined dense v-model="title" label="عنوان" />

          <q-select
            v-model="account"
            :options="accounts"
            option-value="id"
            option-label="name"
            input-debounce="700"
            label="انتخاب حساب"
            behavior="menu"
            use-input
            outlined
            dense
          >
            <template #no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-input outlined dense v-model.number="amount" type="number" label="هزینه" />

          <q-input outlined dense v-model="description" label="توضیحات" type="textarea" />

          <q-btn color="secondary" label="ثبت" @click.prevent="handleCreateExpense" />
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="alert" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">اخطار</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          وارد کردن عنوان و هزینه الزامی است.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-red">
          <q-btn flat label="خب" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from 'src/store'
import { useRouter } from 'vue-router'
import { Account } from 'src/interface/account'

const store = useStore()
const router = useRouter()

const title = ref('')
const amount = ref(0)
const description = ref('')
const alert = ref(false)
const selectedAccount = reactive({ id: null, name: '' })

const accounts = computed<Array<Account>>(() => store.getters['account/accounts'])
const account = computed({
  get () {
    return selectedAccount
  },
  set (value) {
    selectedAccount.id = value.id
    selectedAccount.name = value.name
  }
})

onMounted(async () => {
  await store.dispatch('account/getAccounts')
})

const handleCreateExpense = async () => {
  if (!title.value || !amount.value || !account?.value?.id) {
    alert.value = true
    return false
  }

  const payload = {
    title: title.value,
    amount: amount.value,
    description: description.value,
    accountId: parseInt(`${account.value.id}`)
  }

  await store.dispatch('expense/create', payload)
  await store.dispatch('account/amount', {
    id: account.value.id,
    amount: -1 * payload.amount
  })
  router.push({ path: '/expense' })
}
</script>
