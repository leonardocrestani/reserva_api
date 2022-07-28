import { Schedule } from "./Schedule";

export class Court {
    constructor(
        public place_court_name: string,
        public court_name: string,
        public schedules?: Array<Schedule>,
        public place_id?: string,
        public id?: string
    ) { }
}