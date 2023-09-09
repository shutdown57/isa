import { PrismaClient } from '@prisma/client'

import { AccountCreate, AccountUpdate, AccountUpdateAmount } from '../../src/interface/account'

export class Account {
  private prisma

  constructor () {
    this.prisma = new PrismaClient()
  }

  async all (limit = 20, offset = 0) {
    return await this.prisma.account.findMany({
      skip: offset,
      take: limit,
      orderBy: { name: 'asc' }
    })
  }

  async create (payload: AccountCreate) {
    const { amount } = payload
    await this.prisma.account.create({ data: { ...payload, amount: amount ?? 0 } })
  }

  async byId (id: number) {
    return await this.prisma.account.findUnique({
      where: { id },
      include: { invoices: true }
    })
  }

  async update (payload: AccountUpdate) {
    const { id, ...data } = payload
    await this.prisma.account.update({
      where: { id: parseInt(`${id}`) },
      data
    })
  }

  async search (needle: string) {
    return await this.prisma.account.findMany({
      where: {
        name: { contains: needle }
      },
      take: 20,
      orderBy: { name: 'asc' }
    })
  }

  async amount (payload: AccountUpdateAmount): Promise<void> {
    await this.prisma.account.update({
      where: { id: parseInt(`${payload.id}`) },
      data: { amount: { increment: parseInt(`${payload.amount}`) } }
    })
  }
}
