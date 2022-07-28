import { CourtModel } from "../models";

export interface CourtRepository {
    create: (court: CourtModel) => Promise<CourtModel>;

    find: (place_court_name: string, court_name: string) => Promise<CourtModel>;

    updatePlaceName: (court_name: string, data: any) => Promise<CourtModel>;
}