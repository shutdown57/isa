import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    enToFa (value: string|number): string {
      // @ts-ignore
      return this.$persianTools.digitsEnToFa(value)
    },

    addComma (value: string|number): string {
      // @ts-ignore
      return this.$persianTools.addCommas(value)
    },

    toStringValue (value: number|string): string {
      return `${value}`
    }
  }
})
