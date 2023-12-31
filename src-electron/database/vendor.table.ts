import { Base } from './base'
import { VendorCreate, VendorUpdate } from 'src/interface/vendor'

export class Vendor extends Base {
  constructor () {
    super()
  }

  async all (limit = 20, offset = 0) {
    return await this.prisma.vendor.findMany({
      skip: offset,
      take: limit,
      orderBy: { name: 'asc' }
    })
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

  async update (payload: VendorUpdate) {
    const { id, ...data } = payload
    await this.prisma.vendor.update({
      where: { id: parseInt(`${id}`) },
      data
    })
  }

  async search (needle: string) {
    return await this.prisma.vendor.findMany({
      where: {
        name: { contains: needle }
      },
      take: 20,
      orderBy: { name: 'asc' }
    })
  }
}
