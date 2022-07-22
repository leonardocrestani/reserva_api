import { CourtModel } from "../../../application/models";
import { CourtRepository } from "../../../application/repository";

export class CourtRepositoryMemory implements CourtRepository {
    createdCourts: Array<CourtModel> = [];

    async create(data: CourtModel): Promise<CourtModel> {
        this.createdCourts.push(data);
        const court = this.createdCourts[0];
        return court;
    }

    async find(place_name: string, court_name: string): Promise<CourtModel> {
        const courts = this.createdCourts.find((court) => {
            if (court.court_place_name === place_name && court.court_name === court_name) {
                return court
            }
        });
        return courts;
    }
}