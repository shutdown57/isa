import { boot } from 'quasar/wrappers'
// @ts-ignore
import * as moment from 'moment-jalaali'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $moment: object;
  }
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.config.globalProperties.$moment = moment
  app.provide('moment', moment)
})
