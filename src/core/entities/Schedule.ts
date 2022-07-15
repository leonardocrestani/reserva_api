export class Schedule {

    constructor(
        public court_id: string,
        public hour: number,
        public min: number,
        public is_rent: boolean,
        public responsible_person: string
    ) { }

}