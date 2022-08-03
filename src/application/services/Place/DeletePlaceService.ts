import { DeletePlace } from "../../../core/use-cases";
import { NotFound } from "../../errors";
import { PlaceRepository } from "../../repository";

export class DeletePlaceService implements DeletePlace {
    constructor(private readonly placeRepository: PlaceRepository) { }

    async delete(place_name: string): Promise<void> {
        const place = await this.placeRepository.findByName(place_name);
        if (!place) {
            throw new NotFound("Local nao encontrado");
        }
        await this.placeRepository.delete(place_name);
    }
}