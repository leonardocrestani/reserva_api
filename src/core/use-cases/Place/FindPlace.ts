import { Place } from '../../entities';

export interface FindPlace {
    findAll: (limit: number, offset: number) => Promise<Place[]>;
    findByName: (place_name: string) => Promise<Place>;
    findByCnpj: (cnpj: string) => Promise<Place>;
}