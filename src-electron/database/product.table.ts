import { PrismaClient } from '@prisma/client'

import { ProductCreate } from '../../src/interface/product'

export class Product {
  private prisma

  constructor () {
    this.prisma = new PrismaClient()
  }

  async all (limit: number = 20, offset: number = 0): Promise<any> {
    return await this.prisma.product.findMany({ skip: offset, take: limit, orderBy: { name: 'asc' } })
  }

  async create (payload: ProductCreate) {
    await this.prisma.product.create({ data: payload })
  }

  async byId (id: number) {
    return await this.prisma.product.findUnique({
      where: { id },
      include: {
        invoices: true
      }
    })
  }

  async search (needle: string) {
    return await this.prisma.product.findMany({
      where: {
        name: { contains: needle }
      },
      take: 20,
      orderBy: { name: 'asc' }
    })
  }
}