export class Schedule {

    constructor(
        public place_court_name: string,
        public court_name: string,
        public hour: number,
        public is_rent: boolean,
        public responsible_person_email?: string | null,
        public responsible_person_id?: string | null,
        public responsible_person_full_name?: string | null,
        public court_id?: string,
        public id?: string
    ) { }

}