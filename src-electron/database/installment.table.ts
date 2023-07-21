import { PrismaClient } from '@prisma/client'

import { InstallmentUpdate } from '../../src/interface/installment'
import { InvoiceInstallment } from 'src/interface/invoice'

export class Installment {
  private prisma

  constructor() {
    this.prisma = new PrismaClient()
  }

  async all(limit: number = 20, offset: number = 0): Promise<any> {
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

  async create(payload: InvoiceInstallment): Promise<void> {
    console.log(payload)
    // await this.prisma.installment.create({ data: payload })
    // await this.prisma.installment.upsert({
    //   where: {  }
    // })
  }

  // async createAll (payload: Array<InstallmentCreate>) {
  //   await this.prisma.installment.createMany({
  //     data: payload,
  //     skipDuplicates: true
  //   })
  // }


  async byInvoiceId(id: number): Promise<any> {
    return await this.prisma.installment.findFirst({
      where: { id },
      include: { customer: true }
    })
  }

  async byId(id: number): Promise<any> {
    return await this.prisma.installment.findFirst({
      where: { id },
      include: { invoice: true, customer: true }
    })
  }

  async update(payload: InstallmentUpdate): Promise<void> {
    const { id, ...data } = payload
    await this.prisma.installment.update({
      where: { id },
      data
    })
  }
}
