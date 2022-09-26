export class Schedule {
  constructor (
        public place_name: string,
        public court_name: string,
        public hour: number,
        public day: string,
        public court_id: string,
        public is_rent: boolean = false,
        public responsible_person_email: string | null = null,
        public responsible_person_id: string | null = null,
        public responsible_person_full_name: string | null = null
  ) { }
}
