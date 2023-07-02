import { Customer } from './customer'
import { Invoice } from './invoice'

export type Installment = {
  id?: number
  paid?: boolean
  description?: string
  amount?: number
  date?: Date
  createdAt?: Date
  updatedAt?: Date
  customerId?: number
  customer?: Customer
  invoiceId?: number
  invoice?: Invoice
}

export type InstallmentCreate = {
  paid?: boolean
  description?: string
  amount?: number
  date?: Date
}

export type InstallmentUpdate = {
  id: number
  paid?: boolean
  description?: string
  amount?: number
  date?: Date
  customerId?: number
  invoiceId?: number
}
