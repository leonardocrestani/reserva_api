import { PlaceModel } from "../../../application/models";
import { PlaceRepository } from "../../../application/repository";

export class PlaceRepositoryMemory implements PlaceRepository {
    createdPlaces: Array<PlaceModel> = [];

    async create(place: PlaceModel): Promise<PlaceModel> {
        this.createdPlaces.push(place);
        const newPlace = this.createdPlaces[0];
        return newPlace;
    }

    async findAll(limit: number, offset: number): Promise<PlaceModel[]> {
        const places = this.createdPlaces.slice(offset, limit);
        return places;
    }

    async findByName(name: string): Promise<PlaceModel> {
        const place = this.createdPlaces.find(place => place.place_name === name);
        return place;
    }

    async findByCnpj(cnpj: string): Promise<PlaceModel> {
        const place = this.createdPlaces.find(place => place.cnpj === cnpj);
        return place;
    }

    async update(cnpj: string, data: any): Promise<PlaceModel> {
        let place = this.createdPlaces.find(place => place.cnpj === cnpj);
        place = data;
        return place;
    }

    async updateNumberOfCourts(place_name: string): Promise<PlaceModel> {
        const place = this.createdPlaces.find(place => place.place_name === place_name);
        place.number_of_courts += 1;
        return place;
    }

    async delete(cnpj: string): Promise<any> {
        this.createdPlaces.find((place) => {
            if (place.cnpj === cnpj) {
                this.createdPlaces.pop();
            }
        });
    }
}