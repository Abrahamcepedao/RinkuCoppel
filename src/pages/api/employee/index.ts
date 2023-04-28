import prisma from "../../../../lib/prisma";

//@ts-ignore
export default async function handle(req, res) {
    const { num, name, role } = req.body

    const resutlt = await prisma.employees.create({
        data: {
            num: Number(num),
            name: name,
            role: role
        }
    })
    res.json(resutlt)
}