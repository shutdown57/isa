<template>
  <q-page>
    <div class="row mt-3 justify-evenly">
      <q-card class="my-card bg-purple text-white">
        <q-card-section>
          <div class="text-h6">
            Dashboard tile of numbering info
          </div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat>Action 1</q-btn>
          <q-btn flat>Action 2</q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="my-card bg-purple text-white">
        <q-card-section>
          <div class="text-h6">
            Dashboard tile of numbering info
          </div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat>Action 1</q-btn>
          <q-btn flat>Action 2</q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <div class="row mt-3 justify-evenly">
      <BarComponent :chart-data="chartData" :chart-options="chartOptions" />
      <BarComponent :chart-data="chartData" :chart-options="chartOptions" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import BarComponent from 'src/components/chart/BarComponent.vue'
// import { useStore } from 'src/store'
// import { onMounted } from 'vue'
//
// const store = useStore()

// onMounted(() => {
//   store.getters['invoice/']
// })

const chartData = {
  labels: ['January', 'February', 'March'],
  datasets: [{ data: [40, 20, 12] }]
}

const chartOptions = {
  responsive: true
}
</script>

<style lang="scss" scoped>
.mt-3 {
  margin-top: 3rem;
}
</style>
