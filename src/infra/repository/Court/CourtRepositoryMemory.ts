import { CourtModel } from "../../../application/models";
import { CourtRepository } from "../../../application/repository";

export class CourtRepositoryMemory implements CourtRepository {
    createdCourts: Array<CourtModel> = [];

    async create(data: CourtModel): Promise<CourtModel> {
        this.createdCourts.push(data);
        const court = this.createdCourts[0];
        return court;
    }

    async findById(id: string): Promise<CourtModel> {
        const courts = this.createdCourts.find((court) => {
            if (court.id === id) {
                return court
            }
        });
        return courts;
    }

    async pushCourts(place_id: string, court: any): Promise<void> {
        
    }

    async updatePlaceName(id: string, place_name: string): Promise<CourtModel> {
        let court = this.createdCourts.find(court => court.court_name === place_name);
        court.place_name = place_name;
        return court;
    }

    async update(id: string, data: any): Promise<CourtModel> {
        let court = this.createdCourts.find(court => court.id === data);
        court = data;
        return court;
    }

    async delete(id: string): Promise<void> {
        this.createdCourts.find((court) => {
            if (court.id === id) {
                this.createdCourts.pop();
            }
        });
    }
}