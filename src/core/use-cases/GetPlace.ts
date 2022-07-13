import { Place } from '../entities';

export interface GetPlace {
    execute: (place_name: string) => Promise<Place>
}