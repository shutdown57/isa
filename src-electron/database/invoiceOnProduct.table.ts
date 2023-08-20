import { PrismaClient } from '@prisma/client'

export class InvoiceOnProduct {
  private prisma

  constructor() {
    this.prisma = new PrismaClient()
  }

  async all (limit = 20, offset = 0, buy = false) {
    return this.prisma.invoicesOnProducts.findMany({
      where: {
        invoice: {
          buy
        }
      },
      include: {
        product: true,
        invoice: true
      },
      take: limit,
      skip: offset,
      orderBy: {
        product: {
          name: 'asc'
        }
      },
      distinct: ['productId']
    })
  }
}
