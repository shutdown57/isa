import { Base } from './base'
import { ExpenseCreate, ExpenseUpdate } from 'src/interface/expense'

export class Expense extends Base {
  constructor () {
    super()
  }

  async all (limit = 20, offset = 0) {
    return await this.prisma.expense.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { account: true }
    })
  }

  async create (payload: ExpenseCreate) {
    const { amount } = payload
    await this.prisma.expense.create({
      data: { ...payload, amount: parseInt(`${amount}`) }
    })
  }

  async byId (id: number) {
    return await this.prisma.expense.findFirst({
      where: { id: parseInt(`${id}`) },
      include: { account: true }
    })
  }

  async update (payload: ExpenseUpdate) {
    const { id, amount, ...data } = payload
    await this.prisma.expense.update({
      where: { id: parseInt(`${id}`) },
      data: { ...data, amount: parseInt(`${amount}`) }
    })
  }

  async search (needle: string) {
    return await this.prisma.expense.findMany({
      where: {
        title: { contains: needle }
      },
      take: 20,
      orderBy: { createdAt: 'desc' }
    })
  }

  async count () {
    return await this.prisma.expense.count()
  }

  async remove (id: number): Promise<void> {
    await this.prisma.expense.delete({ where: { id: parseInt(`${id}`) } })
  }
}
