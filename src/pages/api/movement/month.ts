import prisma from "../../../../lib/prisma";

//@ts-ignore
export default async function handle(req, res) {
    const { month } = req.body

    const movements = await prisma.movements.findMany({
        where: { month: month }
    })

    res.json(movements)
}