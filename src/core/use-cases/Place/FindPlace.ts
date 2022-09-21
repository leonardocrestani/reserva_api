import { Place } from '../../entities'

export interface FindPlace {
    findById: (id: string) => Promise<Place>;
    findByName: (name: string) => Promise<Place>;
    findByCnpj: (cnpj: string) => Promise<Place>;
}
