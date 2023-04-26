import { builder } from "../builder";

builder.prismaObject('Employees', {
  fields: (t) => ({
    num: t.exposeID('num'),
    name: t.exposeString('name'),
    role: t.expose('role', { type: EmpRole })
  })
})

//EnumType
const EmpRole = builder.enumType('EmpRole', {
  values: ['CHOFER', 'CARGADOR', 'AUXILIARES'] as const,
})

//Queries
builder.queryField("employees", (t) => 
  t.prismaField({
    type: ['Employees'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.employees.findMany({...query})
  })
)