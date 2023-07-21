import { boot } from 'quasar/wrappers'
import { digitsEnToFa, addCommas } from '@persian-tools/persian-tools'

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $persianTools: object;
//   }
// }

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async () => {
//   app.config.globalProperties.$persianTools = persianTools
//   app.provide('persiantools.enToFa', digitsEnToFa as DigitsConverter)
})

export {
  digitsEnToFa,
  addCommas
}
