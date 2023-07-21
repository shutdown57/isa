import { boot } from 'quasar/wrappers'
import * as moment from 'moment-jalaali'

const datetime = (value: string|undefined): string => moment(value).format('jYYYY/jM/jD HH:mm')

const date = (value: string|undefined): string => moment(value).format('jYYYY/jM/jD')

const time = (value: string|undefined): string => moment(value).format('HH:mm')

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async () => {
  // something to do
})

export { datetime, date, time }
