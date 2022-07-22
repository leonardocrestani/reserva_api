import { Court } from '../../entities';

export interface FindCourt {
    find: (place_name: string, court_name: string) => Promise<Court>;
}