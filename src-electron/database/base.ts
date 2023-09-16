import { PrismaClient } from '@prisma/client'

export class Base {
  readonly prisma: PrismaClient = new PrismaClient()

  constructor () {
    if (!this.prisma) {
      this.prisma = new PrismaClient()
    }
  }
}
