import { CourtModel } from "../models";

export interface CourtRepository {
    create: (court: CourtModel) => Promise<object>;

    find: (place_name: string, court_name: string) => Promise<CourtModel | null>;
}