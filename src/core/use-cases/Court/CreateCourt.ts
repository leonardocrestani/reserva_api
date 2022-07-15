import { Court } from "../../entities";

export interface CreateCourt {
    create: (court: Court) => Promise<object>
}