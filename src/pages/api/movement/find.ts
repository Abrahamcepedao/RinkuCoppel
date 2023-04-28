import prisma from "../../../../lib/prisma";

//@ts-ignore
export default async function handle(req, res) {
    const { empId, month } = req.body

    const movement = await prisma.movements.findFirst({
        where: { empId: Number(empId), month: month }
    })

    res.json(movement)
}