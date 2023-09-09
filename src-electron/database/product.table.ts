import { PrismaClient } from '@prisma/client'

import { ProductCreate, ProductQuantity, ProductUpdate } from 'src/interface/product'

export class Product {
  private prisma

  constructor () {
    this.prisma = new PrismaClient()
  }

  async all (limit = 20, offset = 0) {
    return await this.prisma.product.findMany({
      skip: offset,
      take: limit,
      orderBy: { name: 'asc' },
      include: {
        price: true
      }
    })
  }

  async create (payload: ProductCreate) {
    return await this.prisma.product.create({ data: payload })
  }

  async update (payload: ProductUpdate) {
    const { id, ...data } = payload
    await this.prisma.product.update({
      where: { id },
      data
    })
  }

  async byId (id: number) {
    return await this.prisma.product.findUnique({
      where: { id },
      include: {
        invoices: true,
        price: true
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

  async count (): Promise<number> {
    return await this.prisma.product.count()
  }

  async quantity (payload: ProductQuantity) {
    const { id, quantity } = payload
    await this.prisma.product.update({
      where: { id },
      data: { quantity: { increment: parseInt(`${quantity}`) } }
    })
  }
}
