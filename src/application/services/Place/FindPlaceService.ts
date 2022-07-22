import { FindPlace } from "../../../core/use-cases";
import { PlaceModel } from "../../models";
import { NotFound } from "../../errors";
import { PlaceRepository } from "../../repository";

export class FindPlaceService implements FindPlace {
    constructor(private readonly placeRepository: PlaceRepository) { }

    async findByName(place_name: string): Promise<PlaceModel> {
        const place = await this.placeRepository.findByName(place_name);
        if (!place) {
            throw new NotFound("Local nao encontrado");
        }
        return place;
    };

    async findByCnpj(cnpj: string): Promise<PlaceModel> {
        const place = await this.placeRepository.findByCnpj(cnpj);
        if (!place) {
            throw new NotFound("Local nao encontrado");
        }
        return place;
    }
}