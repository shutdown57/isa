<template lang="html">
  <q-card class="row justify-center">
    <q-card-section>
      <div class="q-gutter-md" style="min-width: 300px;max-width: 500px">
        <q-input outlined dense v-model="number" label="شماره فاکتور" />

        <q-toggle :label="`${buy ? 'خرید' : 'فروش'}`" v-model="buy" />

        <q-toggle :label="`${installment ? 'اقساط' : 'نقد'}`" v-model="installment" />

        <q-input v-if="installment" outlined dense v-model="installmentQuantity" label="تعداد اقساط" />

        <q-input v-if="installment" outlined dense v-model="prepayment" label="پیش پرداخت" />

        <q-input outlined dense v-model="description" label="توضیحات فاکتور" type="textarea" />

        <!-- <span> -->
        <!--   مبلغ فاکتور -->

        <!--   <q-field square filled dense> -->
        <!--     <template v-slot:prepend> -->
        <!--       <q-icon name="payments" /> -->
        <!--     </template> -->

        <!--     <template v-slot:control> -->
        <!--       <div class="self-center full-width no-outline"> -->
        <!--         {{ digitsEnToFa(addCommas(`${totalAmount}`)) }} -->
        <!--       </div> -->
        <!--     </template> -->
        <!--   </q-field> -->
        <!-- </span> -->

        <q-btn color="secondary" label="ثبت" @click.prevent="handleCreateInvoice" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Invoice } from 'src/interface/invoice'

const props = defineProps<{invoice: Invoice}>()
const route = useRoute()

const emit = defineEmits<{(e: 'InvoiceValues', invoice: Invoice): void}>()

const number = ref<string>('')
const installment = ref<boolean>(true)
const buy = ref<boolean>(false)
const installmentQuantity = ref<string | undefined>('3')
const prepayment = ref<string | undefined>('0')
const description = ref<string | undefined>('')

onMounted(() => { fetchData() })

const fetchData = async () => {
  const { id } = route.query
  if (id) {
    number.value = props.invoice?.number ? props.invoice.number : ''
    installment.value = props.invoice?.installment ? props.invoice.installment : true
    buy.value = props.invoice?.buy ? props.invoice.buy : false
    installmentQuantity.value = props.invoice?.installmentQuantity?.toString() ?? '3'
    prepayment.value = props.invoice?.prepayment?.toString() ?? '0'
    description.value = props.invoice?.description ? props.invoice.description : ''
  }
}

const handleCreateInvoice = () => {
  const temp: Invoice = {
    number: number.value,
    installment: installment.value,
    buy: buy.value,
    installmentQuantity: parseInt(installmentQuantity.value || ''),
    prepayment: parseInt(prepayment.value || ''),
    description: description.value
  }
  emit('InvoiceValues', temp)
}
</script>
