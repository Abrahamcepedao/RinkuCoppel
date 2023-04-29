import prisma from "../../../../lib/prisma";

//@ts-ignore
export default async function handle(req, res) {
    const employees = await prisma.employees.findMany()
    
    res.json(employees)
    
}