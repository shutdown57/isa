<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          مدیریت فروش
        </q-toolbar-title>

        <div>ISA version {{ ISA_VERSION ?? '' }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          منو
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const ISA_VERSION = ref('')
if (process.env.VERSION) {
  ISA_VERSION.value = process.env.VERSION
}
const leftDrawerOpen = ref(false)
const essentialLinks = reactive([
  {
    title: 'داشبورد',
    caption: 'صفحه اصلی',
    icon: 'dashboard',
    link: '/'
  },
  {
    title: 'فاکتور‌ها',
    caption: 'مدیریت فاکتور‌ها',
    icon: 'receipt',
    link: '/invoice'
  },
  {
    title: 'هزینه‌ها',
    caption: 'مدیریت هزینه‌ها',
    icon: 'credit_card',
    link: '/expense'
  },
  {
    title: 'مشتریان',
    caption: 'مدیریت مشتریان',
    icon: 'people',
    link: '/customer'
  },
  {
    title: 'محصولات',
    caption: 'مدیریت محصولات',
    icon: 'inventory',
    link: '/product'
  },
  {
    title: 'حساب‌ها',
    caption: 'مدیریت حساب‌ها',
    icon: 'account_balance',
    link: '/account'
  },
  {
    title: 'فروشگاه‌ها',
    caption: 'مدیریت فروشگاه‌ها',
    icon: 'store',
    link: '/vendor'
  }
])

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
