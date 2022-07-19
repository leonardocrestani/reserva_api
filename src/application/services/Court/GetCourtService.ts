import { GetCourt } from "../../../core/use-cases/Court/GetCourt";
import { GetPlaceService } from "../";
import { CourtRepository } from "../../repository";
import { PlaceRepositoryPrisma } from "../../../infra/repository";
import { NotFound } from "../../errors";

export class GetCourtService implements GetCourt {
    constructor(private readonly courtRepository: CourtRepository) { }

    async find(place_name: string, court_name: string): Promise<any> {
        const placeRepository = new PlaceRepositoryPrisma();
        const getPlaceService = new GetPlaceService(placeRepository);
        const place = await getPlaceService.findByName(place_name);
        const place_id = place.id;
        const court = await this.courtRepository.find(place_id, court_name);
        if (!court) {
            throw new NotFound("Quadra nao encontrada");
        }
        return court;
    };
}