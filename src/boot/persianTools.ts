import { boot } from 'quasar/wrappers'
import * as persianTools from '@persian-tools/persian-tools'
import { digitsEnToFa, addCommas } from '@persian-tools/persian-tools'

export default boot(async ({ app }) => {
  app.config.globalProperties.$persianTools = persianTools
  app.provide('persiantools', persianTools)
})

export {
  digitsEnToFa,
  addCommas
}
