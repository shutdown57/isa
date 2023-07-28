import { Invoice } from './invoice'

export type Vendor = {
  id?: number
  name: string
  phone?: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
  invoices?: Invoice[]
}

export type VendorCreate = {
  name: string
  phone?: string
  description?: string
}

export type VendorUpdate = {
  id: number
  name: string
  phone?: string
  description?: string
}
