import { GetPlaceService } from "..";
import { CreateCourt } from "../../../core/use-cases";
import { PlaceRepositoryPrisma } from "../../../infra/repository";
import { CourtModel } from "../../models";
import { CourtRepository } from "../../repository";

export class CreateCourtService implements CreateCourt {
    constructor(private readonly courtRepository: CourtRepository) { };

    async create(data: CourtModel, place_name: string): Promise<object> {
        const placeRepository = new PlaceRepositoryPrisma();
        const placeService = new GetPlaceService(placeRepository);
        const place = await placeService.findByName(place_name);
        data.place_id = place.id;
        return await this.courtRepository.create(data);
    }
}