import { FindPlace } from "../../../core/use-cases";
import { PlaceModel } from "../../models";
import { NotFound } from "../../errors";
import { PlaceRepository } from "../../repository";

export class FindPlaceService implements FindPlace {
    constructor(private readonly placeRepository: PlaceRepository) { }

    async findAll(limit: number, offset: number): Promise<PlaceModel[]> {
        const places = await this.placeRepository.findAll(limit, offset);
        return places
    }

    async findById(id: string): Promise<PlaceModel> {
        const place = await this.placeRepository.findById(id);
        if (!place) {
            throw new NotFound("Local nao encontrado");
        }
        return place;
    };

    async findByName(name: string): Promise<PlaceModel> {
        const place = await this.placeRepository.findByName(name);
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