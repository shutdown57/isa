// import type { BarOptions } from 'chart.js'

export type BarData = {
  labels: Array<string>
  datasets: Array<{ data: Array<number> }>
}

export type BarOptions = {
  responsive: boolean
}

// export { BarOptions }
