import { PlaceModel } from "../models";

export interface PlaceRepository {
    create: (place: PlaceModel) => Promise<object>;

    find: (param: any) => Promise<any | null>;

    findByName: (place_name: string) => Promise<any | null>;

    findByCnpj: (cnpj: string) => Promise<any | null>;
}