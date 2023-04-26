// /graphql/resolvers.ts

//Prisma
import prisma from "../lib/prisma"

export const resolvers = {
  Query: {
    employees: () => {
      return prisma.employees.findMany()
    },
  },
}