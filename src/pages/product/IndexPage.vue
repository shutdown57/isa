<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-btn
          color="primary"
          label="افزودن محصول"
          @click.prevent="() => $router.push({ path: '/product/create' })"
        />
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <q-markup-table separator="cell" dense flat>
          <thead>
            <tr>
              <th class="text-center">کد</th>
              <th class="text-center">نام</th>
              <th class="text-center">قیمت</th>
              <th class="text-center">تعداد</th>
              <th class="text-center">تاریخ ایجاد</th>
              <th class="text-center">تاریخ بروزرسانی</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td class="text-center">{{ enToFa(product.id) }}</td>
              <td class="text-center">{{ product.name }}</td>
              <td class="text-center">{{ enToFa(addComma(`${product.price}`)) }}</td>
              <td class="text-center">{{ enToFa(addComma(`${product.quantity}`)) }}</td>
              <td class="text-center">{{ enToFa(datetime(product.createdAt)) }}</td>
              <td class="text-center">{{ enToFa(datetime(product.updatedAt)) }}</td>
              <td class="text-center">
                <q-btn
                  color="info"
                  label="مشاهده"
                  @click.prevent="() => $router.push({ path: '/product/show/' + product.id })"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import Tools from 'src/mixins/tools'
import Jalaali from 'src/mixins/jalaali'

export default defineComponent({
  name: 'ProductIndexPage',

  mixins: [Tools, Jalaali],

  computed: {
    ...mapGetters({
      products: 'product/products'
    })
  },

  async mounted () {
    this.$store.dispatch('product/getProducts')
  }
})
</script>
