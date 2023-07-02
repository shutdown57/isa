import { PrismaClient } from '@prisma/client'
import { ProductRow } from 'src/interface/product'

import { InvoiceCreate, InvoiceProduct, InvoiceUpdate } from '../../src/interface/invoice'

export class Invoice {
  private prisma

  constructor () {
    this.prisma = new PrismaClient()
  }

  async all (limit: number = 20, offset: number = 0, buy: boolean = false): Promise<any> {
    return await this
      .prisma
      .invoice
      .findMany({
        skip: offset,
        take: limit,
        where: { buy },
        orderBy: { customer: { name: 'asc' } },
        include: {
          customer: true
        }
      })
  }

  async create (payload: InvoiceCreate) {
    return await this.prisma.invoice.create({ data: payload })
  }

  async byId (id: number) {
    return await this
      .prisma
      .invoice
      .findFirst({
        where: { id },
        include: {
          products: true,
          customer: true,
          vendor: true,
          account: true,
          installments: true
        }
      })
  }

  async update (payload: InvoiceUpdate) {
    const { id } = payload
    if (payload.buy) {
      await this.prisma.invoice.update({
        where: { id },
        data: {
          number: payload.number,
          totalAmount: payload.totalAmount,
          description: payload.description,
          installment: payload.installment,
          installmentQuantity: payload.installmentQuantity,
          prepayment: payload.prepayment,
          buy: true,
          customerId: undefined,
          vendorId: payload.vendorId,
          accountId: payload.accountId
        }
      })
    } else {
      await this.prisma.invoice.update({
        where: { id },
        data: {
          number: payload.number,
          totalAmount: payload.totalAmount,
          description: payload.description,
          installment: payload.installment,
          installmentQuantity: payload.installmentQuantity,
          prepayment: payload.prepayment,
          buy: false,
          customerId: payload.customerId,
          vendorId: undefined,
          accountId: payload.accountId
        }
      })
    }
  }

  async upsertProducts (payload: InvoiceProduct) {
    const { id } = payload
    await this.prisma.invoice.update({
      where: { id },
      data: {
        products: {
          create: payload.products.map((p: ProductRow) => {
            return {
              price: parseInt(`${p.price}`),
              quantity: parseInt(`${p.quantity}`),
              description: p.description,
              name: p.name,
              product: {
                connect: {
                  id: parseInt(`${p.id}`)
                }
              }
            }
          })
        }
      }
    })
  }
}
