import { PrismaClient } from '@prisma/client'

import { ExpenseCreate, ExpenseUpdate } from 'src/interface/expense'

export class Expense {
  private prisma

  constructor () {
    this.prisma = new PrismaClient()
  }

  async all (limit: number = 20, offset: number = 0): Promise<any> {
    return await this.prisma.expense.findMany({
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' }
      })
  }

  async create (payload: ExpenseCreate) {
    const { amount } = payload
    await this.prisma.expense.create({ data: { ...payload, amount: parseInt(`${amount}`) } })
  }

  async byId (id: number) {
    return await this.prisma.expense.findUnique({
      where: { id: id }
    })
  }

  async update (payload: ExpenseUpdate) {
    const { id, ...data } = payload
    await this.prisma.expense.update({
      where: { id: parseInt(`${id}`) },
      data
    })
  }

  async search (needle: string) {
    return await this.prisma.expense.findMany({
      where: {
        title: { contains: needle },
      },
      take: 20,
      orderBy: { createdAt: 'desc' }
    })
  }

  async count() {
    return await this.prisma.expense.count()
  }
}
