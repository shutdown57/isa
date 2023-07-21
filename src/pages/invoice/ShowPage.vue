<template lang="html">
  <q-page>
    <q-card flat bordered class="row">
      <q-card-section class="col">
        <p dir="rtl">
          <strong>شماره: </strong> {{ digitsEnToFa(invoice.number || '0') }}
        </p>

        <p dir="rtl">
          <strong>نوع خرید: </strong>
          <strong v-if="invoice.installment">اقساط</strong>
          <strong v-else>نقدی</strong>
        </p>

        <p v-if="invoice.installment" dir="rtl">
          <strong>تعداد قسط: </strong> {{ digitsEnToFa(invoice.installmentQuantity || '0') }}
        </p>

        <p v-if="invoice.installment" dir="rtl">
          <strong>پیش پرداخت: </strong> {{ digitsEnToFa(addCommas(invoice.prepayment || '0')) }}
        </p>

        <p dir="rtl">
          <strong>جمع کل: </strong> {{ digitsEnToFa(addCommas(invoice.totalAmount || '0')) }}
        </p>
      </q-card-section>

      <q-separator vertical />

      <q-card-section class="col">
        <p dir="rtl">
          <strong v-if="invoice.buy">فاکتور فروش: </strong>
          <strong v-else>فاکتور خرید: </strong>
          <q-icon name="check" color="success" />
        </p>

        <p dir="rtl">
          <strong>نام حساب: </strong> {{ invoice.account?.name }}
        </p>

        <p dir="rtl">
          <span v-if="invoice.buy" @click.prevent="router.push({ path: `/vendor/show/${invoice.vendorId}` })">
            <strong>نام فروشنده: </strong> {{ invoice.vendor?.name }}
          </span>
          <a v-else @click.prevent="() => router.push({ path: `/customer/show/${invoice.customerId}` })">
            <strong>نام مشتری: </strong> {{ invoice.customer?.name }}
          </a>
        </p>

        <p dir="rtl">
          <strong>توضیحات: </strong> {{ invoice.description }}
        </p>

        <p dir="rtl">
          <strong>تاریخ ایجاد فاکتور: </strong>
          <span dir="ltr">{{ digitsEnToFa(datetime(invoice.createdAt?.toString())) }}</span>
        </p>

        <p dir="rtl">
          <strong>تاریخ بروزرسانی فاکتور: </strong>
          <span dir="ltr">{{ digitsEnToFa(datetime(invoice.updatedAt?.toString())) }}</span>
        </p>
      </q-card-section>
    </q-card>

    <q-card v-if="invoice.installment">
      <q-card-section>
        <q-markup-table separator="cell" dense flat>
          <thead>
            <tr>
              <th class="text-center">شماره</th>
              <th class="text-center">پرداخت</th>
              <th class="text-center">مبلغ</th>
              <th class="text-center">توضیحات</th>
              <th class="text-center">تاریخ ایجاد</th>
              <th class="text-center">تاریخ بروزرسانی</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(installment, index) in invoice.installments" :key="installment.id">
              <td class="text-center">{{ digitsEnToFa(index + 1) }}</td>
              <td class="text-center">
                <q-icon v-if="installment.paid" name="check" color="positive" />
                <q-icon v-else name="close" color="negative" />
              </td>
              <td class="text-center">{{ digitsEnToFa(addCommas(`${installment.amount}`)) }}</td>
              <td>{{ installment.description ?? '----' }}</td>
              <td class="text-center">{{ digitsEnToFa(datetime(installment.createdAt?.toString() || '')) }}</td>
              <td class="text-center">{{ digitsEnToFa(datetime(installment.updatedAt?.toString() || '')) }}</td>
              <td class="text-center">
                <q-btn v-if="!installment.paid" color="positive" icon="check" lable="پرداخت" @click.prevent="handlePay(installment)" />
                <q-btn v-else color="negative" icon="close" lable="پرداخت" @click.prevent="handlePay(installment)" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>

    <q-card v-if="invoice.products && invoice.products?.length > 0">
      <q-card-section>
        <q-markup-table separator="cell" dense flat>
          <thead>
            <tr>
              <th class="text-center">شماره</th>
              <th class="text-center">نام محصول</th>
              <th class="text-center">توضیحات</th>
              <th class="text-center">تعداد</th>
              <th class="text-center">فی</th>
              <th class="text-center">مبلغ کل</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(product, index) in invoice.products" :key="product.id">
              <td class="text-center">{{ digitsEnToFa(index + 1) }}</td>
              <td class="text-center">{{ product?.product.name }}</td>
              <td>{{ product.description ?? '----' }}</td>
              <td class="text-center">{{ digitsEnToFa(`${product.quantity}`) }}</td>
              <td class="text-center">{{ digitsEnToFa(addCommas(product.price?.toString() || '')) }}</td>
              <td class="text-center">{{ digitsEnToFa(addCommas(amount(product))) }}</td>
            </tr>

            <tr>
              <td>جمع کل</td>
              <td class="text-center" colspan="5">{{ digitsEnToFa(addCommas(totalAmount)) }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { InvoiceOnProduct } from 'src/interface/product'
import { Installment } from 'src/interface/installment'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'src/store'
import { Invoice } from 'src/interface/invoice'
import { digitsEnToFa, addCommas } from 'src/boot/persianTools'
import { datetime } from 'src/boot/jalaali'
import { computed, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const store = useStore()

const invoice = computed((): Invoice => store.getters['invoice/invoice'])
const totalAmount = computed((): number => {
  if (!invoice.value.products || !(invoice.value.products.length > 0)) {
    return 0
  }
  return invoice.value.products.reduce((a: number, b: InvoiceOnProduct): number => (b.price * b.quantity) + a, 0)
})

onMounted(() => { fetchData() })

const fetchData = async () => {
  const { invoiceId } = route.params
  await store.dispatch('invoice/getInvoice', { id: invoiceId })
}

const amount = (product: InvoiceOnProduct): number => (product.quantity * product.price) ?? 0
const handlePay = async (installment: Installment): Promise<void> => {
  store.dispatch('installment/update', {
    id: installment.id,
    paid: !installment.paid
  })
  const { invoiceId } = route.params
  await store.dispatch('invoice/getInvoice', { id: invoiceId })
}
</script>
