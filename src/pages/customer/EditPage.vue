<template>
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <q-input outlined dense v-model="name" label="نام و نام خانوادگی" />
          <q-input outlined dense v-model="phone" label="شماره تلفن" />
          <q-input outlined dense v-model="address" label="آدرس" type="textarea" />
          <q-input outlined dense v-model="description" label="توضیحات" type="textarea" />
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

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'CustomerEditPage',
  data () {
    return {
      name: '',
      phone: '',
      address: '',
      description: '',
      alert: false
    }
  },

  computed: {
    ...mapGetters({
      customer: 'customer/customer'
    })
  },

  async mounted () {
    await this.$store.dispatch('customer/getCustomer', {
      id: this.$route.params.customerId
    })
    this.name = this.customer.name
    this.phone = this.customer.phone
    this.address = this.customer.address
    this.description = this.customer.description
  },

  methods: {
    async handleCreateCustomer () {
      if (!this.name || !this.phone) {
        this.alert = true
        return false
      }

      const product = {
        name: this.name,
        phone: this.phone,
        address: this.address,
        description: this.description
      }

      await this.$store.dispatch('customer/updateCustomer', product)
      this.$router.push({ path: '/customer' })
    }
  }
})
</script>
