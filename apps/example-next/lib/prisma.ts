import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export function fetchTokens() {
  return prisma.tokens.findMany()
}