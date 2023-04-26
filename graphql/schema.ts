//Graphql schema
import "./types/User"
import "./types/Employee"
import "./types/Movement"

import { builder } from "./builder"
export const schema = builder.toSchema()