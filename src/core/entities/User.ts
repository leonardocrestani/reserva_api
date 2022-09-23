import { Schedule } from './'

export class User {
  constructor (
        public first_name: string,
        public last_name: string,
        public cpf: string,
        public genre: string,
        public country: string,
        public email: string,
        public password: string,
        public phone_number: string,
        public schedules: Array<Schedule> = []
  ) { }
}
