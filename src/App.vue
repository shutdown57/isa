<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'

  // async mounted () {
  //   // @ts-ignore
  //   const { database } = window
  //   await database.init()
  // }
})
</script>
