import { Place } from '../../entities';

export interface FindPlace {
    findByName: (place_name: string) => Promise<Place>;
    findByCnpj: (cnpj: string) => Promise<Place>;
}