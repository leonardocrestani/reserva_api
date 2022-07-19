import { CourtModel } from "../models";

export interface CourtRepository {
    create: (court: CourtModel) => Promise<CourtModel>;

    find: (place_name: string, court_name: string) => Promise<CourtModel>;
}