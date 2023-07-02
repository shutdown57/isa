<template>
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <q-input outlined dense v-model="name" label="نام محصول" />
          <q-input outlined dense v-model="description" label="توضیحات محصول" type="textarea" />
          <q-input outlined dense v-model="price" label="قیمت مصحول" />
          <q-input outlined dense v-model="quantity" label="تعداد محصول" />
          <q-btn color="secondary" label="ثبت" @click.prevent="handleCreateProduct" />
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
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductCreatePage',

  data () {
    return {
      name: '',
      description: '',
      price: '',
      quantity: '',
      alert: false
    }
  },

  methods: {
    async handleCreateProduct () {
      if (!this.name) {
        this.alert = true
        return false
      }
      const product = {
        name: this.name,
        description: this.description,
        price: parseInt(this.price || '0'),
        quantity: parseInt(this.quantity || '0')
      }

      await this.$store.dispatch('product/createProduct', product)
      this.$router.push({ path: '/product' })
    }
  }
})
</script>
