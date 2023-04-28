import prisma from "../../../../lib/prisma";

//@ts-ignore
export default async function handle(req, res) {
    const { empId, month, deliveries, totBonus, totDeliveries, isr, isrAdd, cupons, gross, net } = req.body

    const employee = await prisma.employees.findUnique({
        where: { num: parseInt(empId as string )}
    })

    const resutlt = await prisma.movements.create({
        data: {
            employee: { connect: { num: employee?.num }},
            //empId: parseInt(empId as string),
            month: month,
            deliveries: parseInt(deliveries as string),
            totBonus: totBonus,
            totDeliveries: totDeliveries,
            isr: isr,
            isrAdd: isrAdd,
            cupons: cupons,
            gross: gross,
            net: net,
        }
    })
    res.json(resutlt)
}