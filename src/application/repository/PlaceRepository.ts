import { PlaceModel } from "../models";

export interface PlaceRepository {
    create: (place: PlaceModel) => Promise<PlaceModel>;

    findAll: (limit: number, offset: number) => Promise<PlaceModel[]>

    findById: (id: string) => Promise<PlaceModel>;

    findByName: (name: string) => Promise<PlaceModel>;

    findByCnpj: (cnpj: string) => Promise<PlaceModel>;

    update: (name: string, data: any) => Promise<PlaceModel>;

    updateNumberOfCourts: (name: string) => Promise<PlaceModel>;

    delete: (name: string) => Promise<void>
}