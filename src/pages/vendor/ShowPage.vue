<template lang="html">
  <q-page>
    <q-card class="row justify-center">
      <q-card-section>
        <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
          <p>
            <strong>کد: </strong> {{ vendor.id }}
          </p>
          <p>
            <strong>نام: </strong> {{ vendor.name }}
          </p>
          <p>
            <strong>تلفن: </strong> {{ vendor.phone }}
          </p>
          <p>
            <strong>توضیحات: </strong> {{ vendor.description }}
          </p>
          <p>
            <strong>تاریخ ایجاد: </strong> {{ enToFa(datetime(vendor.createdAt)) }}
          </p>
          <p>
            <strong>تاریخ بروزرسانی: </strong> {{ enToFa(datetime(vendor.updatedAt)) }}
          </p>
          <!-- TODO: Add edit vendor -->
          <q-btn
            color="warning"
            label="ویرایش"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-card class="row justify-center">
      <q-card-section>
        <!-- TODO: Add vendor invoices -->
        A table of vendor invoices
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'VendorShowPage',

  computed: {
    ...mapGetters({
      vendor: 'vendor/vendor'
    })
  },

  mounted () {
    this.$store.dispatch('vendor/getVendor', {
      id: this.$route.params.vendorId
    })
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
