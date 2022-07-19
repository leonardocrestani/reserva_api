import { GetPlace } from "../../../core/use-cases";
import { PlaceModel } from "../../models";
import { NotFound } from "../../errors";
import { PlaceRepository } from "../../repository";

export class GetPlaceService implements GetPlace {
    constructor(private readonly placeRepository: PlaceRepository) { }

    async find(params: any): Promise<any | null> {
        const place = await this.placeRepository.find(params);
        if(!place) {
            throw new NotFound("Local nao encontrado")
        }
        return place;
    }

    async findByName(place_name: string): Promise<any | null> {
        const place = await this.placeRepository.findByName(place_name);
        if (!place) {
            throw new NotFound("Local nao encontrado");
        }
        return place;
    };

    async findByCnpj(cnpj: string): Promise<any | null> {
        const place = await this.placeRepository.findByCnpj(cnpj);
        if (!place) {
            throw new NotFound("Local nao encontrado");
        }
        return place;
    }
}