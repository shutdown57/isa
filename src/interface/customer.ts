import { Installment } from './installment'
import { Invoice } from './invoice'

export type Customer = {
  id?: number
  name?: string
  description?: string
  phone: string
  address?: string
  city?: string
  createdAt?: Date
  updatedAt?: Date
  representativeId?: number
  representative?: Customer
  presents?: Customer[]
  installments?: Installment[]
  invoices?: Invoice[]
}

export type CustomerCreate = {
  name?: string
  description?: string
  phone: string
  address?: string
  city?: string
  representativeId?: number
}

export type CustomerUpdate = {
  id: number
  name?: string
  description?: string
  phone: string
  address?: string
  city?: string
  representativeId?: number
}

export type CustomerSelect = {
  value: number
  label: string
}
