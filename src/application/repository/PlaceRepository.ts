import { PlaceModel } from "../models";

export interface PlaceRepository {
    create: (place: PlaceModel) => Promise<PlaceModel>;

    findAll: (limit: number, offset: number) => Promise<PlaceModel[]>

    findByName: (place_name: string) => Promise<PlaceModel>;

    findByCnpj: (cnpj: string) => Promise<PlaceModel>;

    updateNumberOfCourts: (place_name: string) => Promise<PlaceModel>;

    delete: (cnpj: string) => Promise<void>
}