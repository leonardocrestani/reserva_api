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
            if (court.place_court_name === place_name && court.court_name === court_name) {
                return court
            }
        });
        return courts;
    }

    async updatePlaceName(id: string, data: any): Promise<CourtModel> {
        let court = this.createdCourts.find(court => court.place_court_name === id && court.court_name === id);
        court = data;
        return court;
    }

    async update(place_name: string, court_name: string, data: any): Promise<CourtModel> {
        let court = this.createdCourts.find(court => court.place_court_name === place_name && court.court_name === court_name);
        court = data;
        return court;
    }

    async delete(place_name: string, court_name: string): Promise<void> {
        this.createdCourts.find((court) => {
            if (court.place_court_name === place_name && court.court_name === court_name) {
                this.createdCourts.pop();
            }
        });
    }
}