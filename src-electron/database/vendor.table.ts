import { PrismaClient } from '@prisma/client'

import { VendorCreate } from '../../src/interface/vendor'

export class Vendor {
  private prisma

  constructor () {
    this.prisma = new PrismaClient()
  }

  async all (limit: number = 20, offset: number = 0): Promise<any> {
    return await this.prisma.vendor.findMany({ skip: offset, take: limit, orderBy: { name: 'asc' } })
  }

  async create (payload: VendorCreate) {
    await this.prisma.vendor.create({ data: payload })
  }

  async byId (id: number) {
    return await this.prisma.vendor.findUnique({
      where: { id },
      include: {
        invoices: true
      }
    })
  }
}
