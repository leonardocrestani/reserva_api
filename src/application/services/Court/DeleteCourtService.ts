import { FindPlaceService } from "../";
import { DeleteCourt } from "../../../core/use-cases";
import { NotFound } from "../../errors";
import { CourtRepository, PlaceRepository } from "../../repository";

export class DeleteCourtService implements DeleteCourt {
    constructor(
        private readonly courtRepository: CourtRepository,
        private readonly placeRepository: PlaceRepository,
    ) { };

    async delete(place_name: string, court_name: string): Promise<void> {
        const getPlaceService = new FindPlaceService(this.placeRepository);
        const place = await getPlaceService.findByName(place_name);
        if (!place) {
            throw new NotFound("Quadra nao encontrada");
        }
        await this.courtRepository.delete(place_name, court_name);
    }

}