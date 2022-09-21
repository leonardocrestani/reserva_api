export class Schedule {
  constructor (
        public place_name: string,
        public court_name: string,
        public hour: number,
        public day: string,
        public court_id: any,
        public is_rent?: boolean,
        public responsible_person_email?: string | null,
        public responsible_person_id?: any,
        public responsible_person_full_name?: string | null,
        public id?: string
  ) { }
}
