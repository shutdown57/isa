<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-btn
          color="primary"
          label="افزودن فاکتور"
          @click.prevent="() => $router.push({ path: '/invoice/create' })"
        />
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <q-markup-table separator="cell" dense flat>
          <thead>
            <tr>
              <th class="text-center">کد</th>
              <th class="text-center">شماره</th>
              <th class="text-center">مبلغ</th>
              <th class="text-center">پیش پرداخت</th>
              <th class="text-center">نام مشتری</th>
              <th class="text-center">تاریخ ایجاد</th>
              <th class="text-center">تاریخ بروزرسانی</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="invoice in invoices" :key="invoice.id">
              <td class="text-center">{{ enToFa(invoice.id) }}</td>
              <td class="text-center">{{ invoice.number }}</td>
              <td class="text-center">{{ enToFa(addComma(`${invoice.totalAmount}`)) }}</td>
              <td :class="[ 'text-center', invoice.prepayment !== invoice.totalAmount ? 'bg-red' : 'bg-green' ]">
                {{ enToFa(addComma(`${invoice.prepayment}`)) }}
              </td>
              <td class="text-center">{{ invoice?.customer?.name }}</td>
              <td class="text-center">{{ enToFa(datetime(invoice.createdAt)) }}</td>
              <td class="text-center">{{ enToFa(datetime(invoice.updatedAt)) }}</td>
              <td class="text-center">
                <q-btn
                  color="info"
                  label="مشاهده"
                  @click.prevent="() => $router.push({ path: '/invoice/show/' + invoice.id })"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>

      <q-card-section class="row justify-center">
        <!-- FIXME: Add pagination -->
        <!-- <q-pagination -->
        <!--   v-model="current" -->
        <!--   max="5" -->
        <!--   direction-links -->
        <!--   flat -->
        <!--   color="grey" -->
        <!--   active-color="primary" -->
        <!-- /> -->
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
  name: 'InvoiceIndexPage',

  mixins: [Tools, Jalaali],

  computed: {
    ...mapGetters({
      invoices: 'invoice/invoices'
    })
  },

  async mounted () {
    this.$store.dispatch('invoice/getSellInvoices')
  }
})
</script>
