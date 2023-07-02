import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    datetime (value: string): string {
      // @ts-ignore
      return this.$moment(value).format('jYYYY/jM/jD HH:mm')
    }
  }
})
