import { Place } from '../../entities';

export interface FindPlace {
    findAll: (limit: number, offset: number) => Promise<Place[]>;
    findById: (id: string) => Promise<Place>;
    findByName: (name: string) => Promise<Place>;
    findByCnpj: (cnpj: string) => Promise<Place>;
}