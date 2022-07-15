import { Place } from '../../entities';

export interface GetPlace {
    findByName: (place_name: string) => Promise<Place>;
    findByCnpj: (cnpj: string) => Promise<Place>;
}