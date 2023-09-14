<template>
  <q-item
    clickable
    @click.prevent="goto"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const props = defineProps<{title: string, caption: string, icon: string, link: string}>()
const router = useRouter()

const goto = () => {
  router.push({ path: props.link })
}
</script>
