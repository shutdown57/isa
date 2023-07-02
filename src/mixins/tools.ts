import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    enToFa (value: string): string {
      // @ts-ignore
      return this.$persianTools.digitsEnToFa(value)
    },

    addComma (value: string): string {
      // @ts-ignore
      return this.$persianTools.addCommas(value)
    },

    toStringValue (value: any): string {
      return `${value}`
    }
  }
})
