import { Place } from '../../entities'

export interface FindAllPlaces {
    findAll: (limit: number, offset: number) => Promise<Place[]>;
}
