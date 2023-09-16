import { Base } from './base'
import { Price, PriceCreate, PriceUpdate } from 'src/interface/price'

export class Product extends Base {
  constructor () {
    super()
  }

  async create (payload: PriceCreate) {
    await this.prisma.price.create({
      data: payload
    })
  }

  async all (limit = 20, offset = 0): Promise<Array<Price>> {
    return await this.prisma.price.findMany({
      skip: offset,
      take: limit
    })
  }

  async update (payload: PriceUpdate) {
    const { id, ...data } = payload
    await this.prisma.price.update({
      where: { id },
      data
    })
  }
}
