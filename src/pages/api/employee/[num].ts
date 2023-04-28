import prisma from "../../../../lib/prisma";

//@ts-ignore
export default async function handle(req, res) {
    const empNum = req.query.num 
    if(req.method === 'GET') {
        const employee = await prisma.employees.findUnique({
            where: { num: parseInt(empNum as string)}
        })
        res.json(employee)
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        )
    }
    
}