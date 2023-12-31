import { Base } from './base'
import { CustomerCreate, CustomerUpdate } from '../../src/interface/customer'

export class Customer extends Base {
  constructor () {
    super()
  }

  async all (limit = 20, offset = 0): Promise<any> {
    return await this.prisma.customer.findMany({
      skip: offset,
      take: limit,
      orderBy: { name: 'asc' },
      include: {
        installments: true,
        invoices: true,
        presents: true,
        representative: true
      }
    })
  }

  async create (payload: CustomerCreate) {
    await this.prisma.customer.create({
      data: payload
    })
  }

  async update (payload: CustomerUpdate): Promise<void> {
    const { id, ...data } = payload
    await this.prisma.customer.update({
      where: { id: parseInt(`${id}`) },
      data
    })
  }

  async byId (id: number) {
    return await this.prisma.customer.findFirst({
      where: { id },
      include: {
        invoices: true,
        installments: true,
        representative: true,
        presents: true
      }
    })
  }

  async search (needle: string) {
    return await this.prisma.customer.findMany({
      where: {
        name: { contains: needle }
      },
      take: 20,
      orderBy: { name: 'asc' }
    })
  }
}
