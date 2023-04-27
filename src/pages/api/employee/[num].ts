import prisma from "../../../../lib/prisma";

//@ts-ignore
export default async function handle(req, res) {
    const empNum = req.query.num
    const employee = await prisma.employees.findUnique({
        where: { num: empNum}
    })
    res.json(employee)
}