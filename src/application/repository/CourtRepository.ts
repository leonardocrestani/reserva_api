import { CourtModel } from '../models'

export interface CourtRepository {
    create: (court: CourtModel) => Promise<CourtModel>;

    findById: (id: string) => Promise<CourtModel>;

    updatePlaceName: (id: string, place_name: string) => Promise<CourtModel>;

    update: (id: string, data: any) => Promise<CourtModel>;

    delete: (id: string) => Promise<void>;
}
