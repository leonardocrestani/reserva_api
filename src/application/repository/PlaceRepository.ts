import { PlaceModel } from "../models";

export interface PlaceRepository {
    create: (place: PlaceModel) => Promise<PlaceModel>;

    findByName: (place_name: string) => Promise<PlaceModel>;

    findByCnpj: (cnpj: string) => Promise<PlaceModel>;
}