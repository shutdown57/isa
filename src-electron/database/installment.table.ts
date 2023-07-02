import { PrismaClient } from '@prisma/client'

import { InstallmentCreate, InstallmentUpdate } from '../../src/interface/installment'

export class Installment {
  private prisma

  constructor () {
    this.prisma = new PrismaClient()
  }

  async all (limit: number = 20, offset: number = 0): Promise<any> {
    return await this
      .prisma
      .installment
      .findMany({
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        include: {
          customer: true,
          invoice: true
        }
      })
  }

  async create (payload: InstallmentCreate): Promise<void> {
    await this.prisma.installment.create({ data: payload })
  }

  async byInvoiceId (id: number): Promise<any> {
    return await this.prisma.installment.findFirst({
      where: { id },
      include: { customer: true }
    })
  }

  async byId (id: number): Promise<any> {
    return await this.prisma.installment.findFirst({
      where: { id },
      include: { invoice: true, customer: true }
    })
  }

  async update (payload: InstallmentUpdate): Promise<void> {
    const { id, ...data } = payload
    await this.prisma.installment.update({
      where: { id },
      data
    })
  }
}
