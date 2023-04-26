import { builder } from "../builder";

builder.prismaObject('User', {
    fields: (t) => ({
        id: t.exposeID('id'),
        email: t.exposeString('email'),
        name: t.exposeString('name'),
        role: t.expose('role', { type: UserRole, })
    })
})

const UserRole = builder.enumType('UserRole', {
  values: ['ADMIN'] as const,
})