<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-btn
          color="primary"
          label="افزودن مشتری"
          @click.prevent="() => $router.push({ path: '/customer/create' })"
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
              <th class="text-center">تلفن</th>
              <th class="text-center">آدرس</th>
              <th class="text-center">تاریخ ایجاد</th>
              <th class="text-center">تاریخ بروزرسانی</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.id">
              <td class="text-center">{{ enToFa(customer.id) }}</td>
              <td class="text-center">{{ customer.name }}</td>
              <td class="text-center">{{ customer.phone }}</td>
              <td class="text-center">{{ customer.address }}</td>
              <td class="text-center">{{ enToFa(datetime(customer.createdAt)) }}</td>
              <td class="text-center">{{ enToFa(datetime(customer.updatedAt)) }}</td>
              <td class="text-center">
                <q-btn
                  color="info"
                  label="مشاهده"
                  @click.prevent="() => $router.push({ path: '/customer/show/' + customer.id })"
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

export default defineComponent({
  name: 'CustomerIndexPage',

  computed: {
    ...mapGetters({
      customers: 'customer/customers'
    })
  },

  async mounted () {
    this.$store.dispatch('customer/getCustomers')
  },

  methods: {
    enToFa (value: string): string {
      // @ts-ignore
      return this.$persianTools.digitsEnToFa(value)
    },

    addComma (value: string): string {
      // @ts-ignore
      return this.$persianTools.addCommas(value)
    },

    datetime (value: string): string {
      // @ts-ignore
      return this.$moment(value).format('jYYYY/jM/jD HH:mm')
    }
  }
})
</script>
