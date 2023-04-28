import prisma from "./prisma"

export async function loadDashboard() {
    const employees = await prisma.employees.findMany()

    const movements = await prisma.movements.findMany({
        where: { month: 0 }
    })

    return  { employees, movements }
}