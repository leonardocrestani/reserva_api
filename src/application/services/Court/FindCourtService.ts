import { CourtModel } from "../../models";
import { FindCourt } from "../../../core/use-cases/Court/FindCourt";
import { FindPlaceService } from "..";
import { CourtRepository, PlaceRepository } from "../../repository";
import { NotFound } from "../../errors";

export class FindCourtService implements FindCourt {
    constructor(
        private readonly courtRepository: CourtRepository,
        private readonly placeRepository: PlaceRepository
    ) { };

    async find(place_name: string, court_name: string): Promise<CourtModel> {
        const getPlaceService = new FindPlaceService(this.placeRepository);
        const place = await getPlaceService.findByName(place_name);
        const place_id = place.id;
        const court = await this.courtRepository.find(place.place_name, court_name);
        if (!court) {
            throw new NotFound("Quadra nao encontrada");
        }
        return court;
    };
}