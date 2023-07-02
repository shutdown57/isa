import { boot } from 'quasar/wrappers'
import * as persianTools from '@persian-tools/persian-tools'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $persianTools: object;
  }
}

declare module '@persian-tools/persian-tools' {
  interface persianTools {
    persianTools: object;
  }
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.config.globalProperties.$persianTools = persianTools
  app.provide('persianTools', persianTools)
})
