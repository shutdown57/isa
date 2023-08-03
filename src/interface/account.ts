import { Invoice } from './invoice'

export type Account = {
  id?: number
  name: string
  description?: string
  bank?: string
  amount?: number
  accountNumber?: string
  createdAt?: Date
  updatedAt?: Date
  invoices?: Invoice[]
}

export type AccountCreate = {
  name: string
  description?: string
  bank?: string
  amount?: number
  accountNumber?: string
}

export type AccountUpdate = {
  id: number
  name: string
  description?: string
  bank?: string
  amount?: number
  accountNumber?: string
}

export type AccountUpdateAmount = {
  id: number
  amount: number
}
