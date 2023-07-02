<template lang="html">
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <p>
            <strong>کد: </strong> {{ enToFa(String(product.id)) }}
          </p>
          <p>
            <strong>نام: </strong> {{ product.name }}
          </p>
          <p>
            <strong>قیمت: </strong> {{ enToFa(addComma(product.price)) }}
          </p>
          <p>
            <strong>تعداد: </strong> {{ enToFa(String(product.quantity)) }}
          </p>
          <p>
            <strong>توضیحات: </strong> {{ product.description }}
          </p>
          <p>
            <strong>تاریخ ایجاد: </strong> {{ enToFa(datetime(product.createdAt)) }}
          </p>
          <p>
            <strong>تاریخ بروزرسانی: </strong> {{ enToFa(datetime(product.updatedAt)) }}
          </p>
          <!-- TODO: Add edit vendor -->
          <q-btn
            color="warning"
            label="ویرایش"
            @click.prevent="$router.push({ path: `/product/show/${product.id}/edit` })"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import jalaali from 'src/mixins/jalaali'
import tools from 'src/mixins/tools'

export default defineComponent({
  name: 'ProductShowPage',

  mixins: [jalaali, tools],

  computed: {
    ...mapGetters({
      product: 'product/product'
    })
  },

  mounted () {
    this.$store.dispatch('product/getProduct', { id: this.$route.params.productId })
  }
})
</script>
