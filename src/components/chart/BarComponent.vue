<template>
  <div>
    <Bar
      id="my-chart"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<script setup lang="ts">
import { BarOptions, BarData } from 'src/interface/chart'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

const { chartData, chartOptions } = defineProps<{chartData: BarData, chartOptions: BarOptions}>()

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
</script>
