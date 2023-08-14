<template>
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <q-input outlined dense v-model="name" label="نام و نام خانوادگی" />
          <q-input outlined dense v-model="phone" label="شماره تلفن" />
          <q-input outlined dense v-model="address" label="آدرس" type="textarea" />
          <q-input outlined dense v-model="description" label="توضیحات" type="textarea" />

          <q-select
            v-model="customer"
            :options="customers"
            option-value="id"
            option-label="name"
            input-debounce="700"
            label="انتخاب معرف"
            behavior="menu"
            use-input
            outlined
            dense
            @filter="filterCustomer"
          >
            <template #no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>

            <template v-if="customer" v-slot:append>
              <q-icon name="cancel" @click.stop.prevent="customer = { id: null, name: '' }" class="cursor-pointer" />
            </template>
          </q-select>

          <q-btn color="secondary" label="ثبت" @click.prevent="handleCreateCustomer" />
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
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from 'src/store'
import { useRouter } from 'vue-router'
import { Customer } from 'src/interface/customer'
import { FilterSelect } from 'src/utils/Filters'

const store = useStore()
const router = useRouter()

const name = ref('')
const phone = ref('')
const address = ref('')
const description = ref('')
const alert = ref(false)

const selectedCustomer = reactive({ id: null, name: '' })

const customers = computed<Array<Customer>>(() => store.getters['customer/customers'])
const customer = computed({
  get () {
    return selectedCustomer
  },
  set (value) {
    if (!value) return
    selectedCustomer.id = value.id
    selectedCustomer.name = value.name
  }
})

onMounted(async () => {
  await store.dispatch('customer/getCustomers')
})

const handleCreateCustomer = async () => {
  if (!name.value || !phone.value) {
    alert.value = true
    return false
  }

  const product = {
    name: name.value,
    phone: phone.value,
    address: address.value,
    description: description.value
  }

  await store.dispatch('customer/createCustomer', product)
  router.push({ path: '/customer' })
}

const filterCustomer = new FilterSelect('customer/getCustomers', 'customer/search').create()
</script>
