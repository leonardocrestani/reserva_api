import { GetPlaceService } from "..";
import { CreateCourt } from "../../../core/use-cases";
import { PlaceRepositoryPrisma } from "../../../infra/repository";
import { CourtModel } from "../../models";
import { CourtRepository } from "../../repository";

export class CreateCourtService implements CreateCourt {
    constructor(private readonly courtRepository: CourtRepository) { };

    async create(data: CourtModel): Promise<object> {
        const placeRepository = new PlaceRepositoryPrisma();
        const getPlaceService = new GetPlaceService(placeRepository);
        const place = await getPlaceService.find({ place_name: data.court_place_name });
        place.courts.map((court: any) => {
            if (court.court_name === data.court_name) {
                throw new Error("Quadra ja existente");
            }
        })
        data.place_id = place.id;
        return await this.courtRepository.create(data);
    }
}