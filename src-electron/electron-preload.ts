import { contextBridge } from 'electron'

import { Product } from './database/product.table'
import { Customer } from './database/customer.table'
import { Account } from './database/account.table'
import { Invoice } from './database/invoice.table'
import { Installment } from './database/installment.table'
import { Vendor } from './database/vendor.table'

contextBridge.exposeInMainWorld('database', {
  async product (method: string, params: any) {
    const product = new Product()
    if (method === 'all') {
      return await product.all(params.limit, params.offset)
    } else if (method === 'create') {
      await product.create(params)
    } else if (method === 'byId') {
      const { id } = params
      return await product.byId(parseInt(id))
    } else if (method === 'search') {
      return await product.search(params.needle)
    } else if (method === 'update') {
      await product.update(params)
    }
  },

  async customer (method: string, params: any) {
    const customer = new Customer()
    if (method === 'all') {
      return await customer.all(params.limit, params.offset)
    } else if (method === 'create') {
      await customer.create(params)
    } else if (method === 'byId') {
      const { id } = params
      return await customer.byId(parseInt(id))
    } else if (method === 'search') {
      return await customer.search(params.needle)
    } else if (method === 'update') {
      await customer.update(params)
    }
  },

  async account (method: string, params: any) {
    const account = new Account()
    if (method === 'all') {
      return await account.all(params.limit, params.offset)
    } else if (method === 'create') {
      await account.create(params)
    } else if (method === 'update') {
      await account.update(params)
    } else if (method === 'byId') {
      const { id } = params
      return await account.byId(parseInt(id))
    } else if (method === 'search') {
      return await account.search(params.needle)
    }
  },

  async invoice (method: string, params: any) {
    const invoice = new Invoice()
    if (method === 'all') {
      return await invoice.all(params.limit, params.offset, params.buy)
    } else if (method === 'create') {
      return await invoice.create(params)
    } else if (method === 'byId') {
      const { id } = params
      return await invoice.byId(parseInt(id))
    } else if (method === 'update') {
      await invoice.update(params)
    } else if (method === 'upsertProducts') {
      await invoice.upsertProducts(params)
    } else if (method === 'count') {
      return await invoice.count(params)
    }
  },

  async installment (method: string, params: any) {
    const installment = new Installment()
    if (method === 'all') {
      return await installment.all(params.limit, params.offset)
    } else if (method === 'create') {
      await installment.create(params)
    } else if (method === 'update') {
      await installment.update(params)
    }
  },

  async vendor (method: string, params: any) {
    const vendor = new Vendor()
    if (method === 'all') {
      return await vendor.all(params.limit, params.offset)
    } else if (method === 'create') {
      await vendor.create(params)
    } else if (method === 'byId') {
      const { id } = params
      return await vendor.byId(parseInt(id))
    }
  }
})
