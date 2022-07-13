import { Schedules } from "./";

type place = {
    place_id: string,
    place_name: string
}

export class Court {
    constructor(
        public place: place,
        public schedules: Array<Schedules> = []
    ) { }
}