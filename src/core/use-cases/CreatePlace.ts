import { Place } from "../entities";

export interface CreatePlace {
    create: (place: Place) => Promise<object>
}