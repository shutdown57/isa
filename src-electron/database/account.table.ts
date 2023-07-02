import { PrismaClient } from '@prisma/client'

import { AccountCreate, AccountUpdate } from '../../src/interface/account'

export class Account {
  private prisma

  constructor () {
    this.prisma = new PrismaClient()
  }

  async all (limit: number = 20, offset: number = 0): Promise<any> {
    return await this
      .prisma
      .account
      .findMany({
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
      where: { id: id },
      include: { invoices: true }
    })
  }

  async update (payload: AccountUpdate) {
    const { id, ...data } = payload
    await this.prisma.account.update({
      where: { id },
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
}
