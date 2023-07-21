import { PrismaClient } from '@prisma/client'
import { ProductRow } from 'src/interface/product'

import { InvoiceCreate, InvoiceInstallment, InvoiceProduct, InvoiceUpdate } from '../../src/interface/invoice'

export class Invoice {
  private prisma

  constructor() {
    this.prisma = new PrismaClient()
  }

  async count(buy: boolean | null) {
    if (buy === null) {
      return await this.prisma.invoice.count()
    } else if (buy) {
      return await this.prisma.invoice.count({ where: { buy: true } })
    }
    return await this.prisma.invoice.count({ where: { buy: false } })
  }

  async all(limit: number = 20, offset: number = 0, buy: boolean = false): Promise<any> {
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

  async create(payload: InvoiceCreate) {
    return await this.prisma.invoice.create({
      data: payload
    })
  }

  async byId(id: number) {
    return await this
      .prisma
      .invoice
      .findFirst({
        where: { id },
        include: {
          products: { include: { product: true } },
          customer: true,
          vendor: true,
          account: true,
          installments: true
        }
      })
  }

  async update(payload: InvoiceUpdate) {
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

  async upsertProducts(payload: InvoiceInstallment) {
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

    console.log(payload)
    if (payload.installment) {
      const installments = []
      const prepayment = parseInt(`${payload.prepayment ?? '0'}`)
      const count = payload.installmentQuantity ?? 1
      const amount = prepayment / count
      for (let i = 0; i < count; i++) {
        installments.push({ paid: false, amount })
      }
      return await this.prisma.invoice.update({
        where: { id: payload.id },
        data: {
          installments: {
            create: installments
          }
        }
      })
    }
  }

  // async upsertInstallments (payload: InvoiceInstallment) {
  //   const { id } = payload
  //   await this.prisma.$transaction(
  //     payload.installments.map((i) => {
  //       const installment = {
  //         paid: i?.paid ?? false,
  //         description: i.description ? i.description : undefined,
  //         amount: i?.amount || 0,
  //         date: i?.date || undefined,
  //         customerId: parseInt(`${i.customerId}`),
  //         createdAt: new Date,
  //         updatedAt: new Date
  //       }
  //       return this.prisma.invoice.update({
  //         where: { id },
  //         data: {
  //           installments: {
  //             upsert: {
  //               create: {
  //                 paid: installment.paid,
  //                 description: installment.description,
  //                 amount: installment.amount,
  //                 date: installment.date,
  //                 customer: {
  //                   connect: {
  //                     id: installment.customerId
  //                   }
  //                 },
  //                 createdAt: installment.createdAt,
  //                 updatedAt: installment.updatedAt
  //               },
  //               update: {
  //                 paid: installment.paid ?? false,
  //                 description: installment?.description || null,
  //                 amount: installment?.amount || 0,
  //                 date: installment?.date || null,
  //                 customer: {
  //                   connect: {
  //                     id: installment.customerId
  //                   }
  //                 },
  //                 createdAt: installment.createdAt,
  //                 updatedAt: installment.updatedAt
  //               }
  //             }
  //           }
  //         },
  //         include: {
  //           installments: true
  //         }
  //       })
  //     })
  //   )
  // }
}
