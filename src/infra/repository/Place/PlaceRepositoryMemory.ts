import { PlaceModel } from "../../../application/models";
import { PlaceRepository } from "../../../application/repository";

export class PlaceRepositoryMemory implements PlaceRepository {
    createdPlaces: Array<PlaceModel> = [];

    async create(place: PlaceModel): Promise<PlaceModel> {
        this.createdPlaces.push(place);
        const newPlace = this.createdPlaces[0];
        return newPlace;
    }

    async findByName(name: string): Promise<PlaceModel> {
        const place = this.createdPlaces.find(place => place.place_name === name);
        return place;
    }

    async findByCnpj(cnpj: string): Promise<PlaceModel> {
        const place = this.createdPlaces.find(place => place.cnpj === cnpj);
        return place;
    }
}