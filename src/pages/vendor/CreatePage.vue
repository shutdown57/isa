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

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomerCreatePage',
  data () {
    return {
      name: '',
      phone: '',
      description: '',
      alert: false
    }
  },

  methods: {
    async handleCreateVendor () {
      if (!this.name || !this.phone) {
        this.alert = true
        return false
      }

      const vendor = {
        name: this.name,
        phone: this.phone,
        description: this.description
      }

      await this.$store.dispatch('vendor/createVendor', vendor)
      this.$router.push({ path: '/vendor' })
    }
  }
})
</script>
