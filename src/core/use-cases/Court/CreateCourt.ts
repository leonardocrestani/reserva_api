import { Court } from "../../entities";

export interface CreateCourt {
    create: (court: Court, place_name: string) => Promise<object>
}