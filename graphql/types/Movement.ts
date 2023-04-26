import { builder } from "../builder";

builder.prismaObject('Movements', {
    fields: (t) => ({
        id: t.exposeID('id'),
        emplyee: t.relation('employee'),
        empID: t.exposeInt('empId'),
        month: t.exposeInt('month'),
        deliveries: t.exposeFloat('deliveries'),
        totBonus: t.exposeFloat('totBonus'),
        totDeliveries: t.exposeFloat('totDeliveries'),
        isr: t.exposeFloat('isr'),
        isrAdd: t.exposeFloat('isrAdd'),
        cupons: t.exposeFloat('cupons'),
        gross: t.exposeFloat('gross'),
        net: t.exposeFloat('net'),
    })
})