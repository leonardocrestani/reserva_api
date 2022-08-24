import { DeletePlace } from "../../../core/use-cases";
import { NotFound } from "../../errors";
import { CourtRepository, PlaceRepository } from "../../repository";
import { DeleteCourtService } from "../Court/DeleteCourtService";

export class DeletePlaceService implements DeletePlace {
    constructor(
        private readonly placeRepository: PlaceRepository,
        private readonly courtRepository: CourtRepository
    ) { }

    async delete(name: string): Promise<void> {
        const place = await this.placeRepository.findByName(name);
        if (!place) {
            throw new NotFound("Local nao encontrado");
        }
        const deleteCourtService = new DeleteCourtService(this.courtRepository);
        for(const court of place.courts) {
            await deleteCourtService.delete(court.id);
        }
        await this.placeRepository.delete(name);
    }
}