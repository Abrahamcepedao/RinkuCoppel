import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            email: 'a00827666@tec.mx',
            role: 'ADMIN',
            name: 'Abraham Cepeda'
        }
    })
}

main()
    .catch(e => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })