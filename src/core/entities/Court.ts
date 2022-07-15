import { Schedule } from "./";

type place = {
    place_id: string,
    place_name: string
}

export class Court {
    constructor(
        public place_id: string,
        public court_place_name: string,
        public court_name: string,
        public schedules: Array<Schedule> = []
    ) { }
}