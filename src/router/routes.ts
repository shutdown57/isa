import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
  },

  // Product
  {
    path: '/product',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/product/IndexPage.vue') }]
  },
  {
    path: '/product/create',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/product/CreatePage.vue') }]
  },
  {
    path: '/product/show/:productId',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/product/ShowPage.vue') }]
  },
  {
    path: '/product/show/:productId/edit',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/product/EditPage.vue') }]
  },

  // Expense
  {
    path: '/expense',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/expense/IndexPage.vue') }]
  },
  {
    path: '/expense/create',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/expense/CreatePage.vue') }]
  },
  {
    path: '/expense/show/:expenseId',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/expense/ShowPage.vue') }]
  },
  {
    path: '/expense/show/:expenseId/edit',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/expense/EditPage.vue') }]
  },

  // Customer
  {
    path: '/customer',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/customer/IndexPage.vue') }]
  },
  {
    path: '/customer/create',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/customer/CreatePage.vue') }]
  },
  {
    path: '/customer/show/:customerId',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/customer/ShowPage.vue') }]
  },
  {
    path: '/customer/show/:customerId/edit',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/customer/EditPage.vue') }]
  },

  // Account
  {
    path: '/account',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/account/IndexPage.vue') }]
  },
  {
    path: '/account/create',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/account/CreatePage.vue') }]
  },
  {
    path: '/account/show/:accountId',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/account/ShowPage.vue') }]
  },
  {
    path: '/account/edit/:accountId',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/account/EditPage.vue') }]
  },

  // Invoice
  {
    path: '/invoice',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/invoice/IndexPage.vue') }]
  },
  {
    path: '/invoice/create',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/invoice/CreatePage.vue') }]
  },
  {
    path: '/invoice/show/:invoiceId',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/invoice/ShowPage.vue') }]
  },

  // Vendor
  {
    path: '/vendor',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/vendor/IndexPage.vue') }]
  },
  {
    path: '/vendor/create',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/vendor/CreatePage.vue') }]
  },
  {
    path: '/vendor/show/:vendorId',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/vendor/ShowPage.vue') }]
  },
  {
    path: '/vendor/edit/:vendorId',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/vendor/EditPage.vue') }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
