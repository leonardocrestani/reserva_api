export class Schedule {

    constructor(
        public place_court_name: string,
        public court_id: string,
        public court_name: string,
        public hour: number,
        public min: number,
        public is_rent: boolean,
        public responsible_person_email: string,
        public responsible_person_id: string
    ) { }

}