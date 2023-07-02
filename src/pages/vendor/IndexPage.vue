<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-btn
          color="primary"
          label="افزودن فروشگاه"
          @click.prevent="() => $router.push({ path: '/vendor/create' })"
        />
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="row no-wrap items-center">
          <div class="text-h4 q-ml-md text-black">حساب‌ها</div>
        </div>
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
              <th class="text-center">تاریخ ایجاد</th>
              <th class="text-center">تاریخ بروزرسانی</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vendor in vendors" :key="vendor.id">
              <td class="text-center">{{ enToFa(vendor.id) }}</td>
              <td class="text-center">{{ vendor.name }}</td>
              <td class="text-center">{{ vendor.phone }}</td>
              <td class="text-center">{{ enToFa(datetime(vendor.createdAt)) }}</td>
              <td class="text-center">{{ enToFa(datetime(vendor.updatedAt)) }}</td>
              <td class="text-center">
                <q-btn
                  color="info"
                  label="مشاهده"
                  @click.prevent="() => $router.push({ path: '/vendor/show/' + vendor.id })"
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
  name: 'VendorIndexPage',

  computed: {
    ...mapGetters({
      vendors: 'vendor/vendors'
    })
  },

  async mounted () {
    this.$store.dispatch('vendor/getVendors')
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
