import { Court } from '../../entities';

export interface GetCourt {
    find: (place_name: string, court_name: string) => Promise<Court>;
}