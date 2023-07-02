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

<script lang="ts">
import { defineComponent } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'داشبورد',
    caption: 'صفحه اصلی',
    icon: 'dashboard',
    link: '/'
  },
  {
    title: 'محصولات',
    caption: 'مدیریت محصولات',
    icon: 'inventory',
    link: '/product'
  },
  {
    title: 'مشتریان',
    caption: 'مدیریت مشتریان',
    icon: 'people',
    link: '/customer'
  },
  {
    title: 'حساب‌ها',
    caption: 'مدیریت حساب‌ها',
    icon: 'account_balance',
    link: '/account'
  },
  {
    title: 'فاکتور‌ها',
    caption: 'مدیریت فاکتور‌ها',
    icon: 'receipt',
    link: '/invoice'
  },
  {
    title: 'فروشگاه‌ها',
    caption: 'مدیریت فروشگاه‌ها',
    icon: 'storefront',
    link: '/vendor'
  }
]
let ISA_VERSION: string | undefined
if (process.env.VERSION) {
  ISA_VERSION = process.env.VERSION
}

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      ISA_VERSION,
      leftDrawerOpen: false,
      essentialLinks: linksList
    }
  },

  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
})
</script>
