import { Place } from "../entities";

export interface CreatePlace {
    execute: (place: Place) => Promise<object>
}