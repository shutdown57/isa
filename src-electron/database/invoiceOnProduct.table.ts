import { Base } from './base'

export class InvoiceOnProduct extends Base {
  constructor () {
    super()
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
