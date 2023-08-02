<template lang="html">
  <q-page>
    <q-card>
      <q-card-section>
        <q-btn
          color="primary"
          label="افزودن فاکتور"
        />
          <!-- @click.prevent="() => router.push({ path: '/invoice/create' })" -->
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        Expenses: {{ expenses.length }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'src/store'

const store = useStore()

const expenses = computed(() => store.getters['expense/expenses'])
</script>
