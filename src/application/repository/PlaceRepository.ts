import { PlaceModel } from '../models'

export interface PlaceRepository {
    create: (place: PlaceModel) => Promise<PlaceModel>;

    findAll: (limit: number, offset: number) => Promise<PlaceModel[]>

    countPlaces: () => Promise<number>

    findById: (id: string) => Promise<PlaceModel>;

    findByName: (name: string) => Promise<PlaceModel>;

    findByCnpj: (cnpj: string) => Promise<PlaceModel>;

    update: (name: string, data: object) => Promise<PlaceModel>;

    updateNumberOfCourts: (name: string) => Promise<PlaceModel>;

    delete: (name: string) => Promise<number>
}
