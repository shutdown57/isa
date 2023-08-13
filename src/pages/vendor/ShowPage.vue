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
            <strong>تاریخ ایجاد: </strong> {{ digitsEnToFa(datetime(vendor.createdAt)) }}
          </p>
          <p>
            <strong>تاریخ بروزرسانی: </strong> {{ digitsEnToFa(datetime(vendor.updatedAt)) }}
          </p>
          <q-btn
            color="warning"
            label="ویرایش"
            @click.prevent="() => router.push({ path: '/vendor/edit/' + vendor.id })"
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

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'src/store'
import { digitsEnToFa } from 'src/boot/persianTools'
import { datetime } from 'src/boot/jalaali'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()

const vendor = computed(() => store.getters['vendor/vendor'])

onMounted(() => {
  store.dispatch('vendor/getVendor', {
    id: route.params.vendorId
  })
})
</script>
