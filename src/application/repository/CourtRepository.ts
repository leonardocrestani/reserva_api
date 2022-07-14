import { Court } from "../../core/entities";

export interface CourtRepository {
    create: (court: Court) => Promise<object>;

    find: (place_name: string, court_name: string) => Promise<any | null>;
}