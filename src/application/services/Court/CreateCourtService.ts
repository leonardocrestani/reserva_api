import { FindPlaceService } from "..";
import { CreateCourt } from "../../../core/use-cases";
import { CourtModel } from "../../models";
import { CourtRepository, PlaceRepository } from "../../repository";
import { Conflict } from "../../errors";

export class CreateCourtService implements CreateCourt {
    constructor(
        private readonly courtRepository: CourtRepository,
        private readonly placeRepository: PlaceRepository
    ) { };

    async create(data: CourtModel): Promise<CourtModel> {
        const getPlaceService = new FindPlaceService(this.placeRepository);
        const place = await getPlaceService.findByName(data.court_place_name);
        place.courts.map((court: any) => {
            if (court.court_name === data.court_name) {
                throw new Conflict("Quadra ja existente");
            }
        })
        data.place_id = place.id;
        return await this.courtRepository.create(data);
    }
}