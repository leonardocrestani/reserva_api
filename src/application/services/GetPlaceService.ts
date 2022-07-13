import { GetPlace } from "../../core/use-cases";
import { PlaceModel } from "../models";
import { PlaceRepository } from "../repository";

export class GetPlaceService implements GetPlace {
    constructor(private readonly placeRepository: PlaceRepository) { }

    async findByName(place_name: string): Promise<PlaceModel> {
        const place = await this.placeRepository.findByName(place_name);
        if (!place) {
            throw new Error("Local nao encontrado");
        }
        return place;
    };

    async findByCnpj(cnpj: string): Promise<PlaceModel> {
        const place = await this.placeRepository.findByCnpj(cnpj);
        if (!place) {
            throw new Error("Local nao encontrado");
        }
        return place;
    }
}