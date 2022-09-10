import { Schedule } from './Schedule'

export class Court {
  constructor (
        public place_name: string,
        public court_name: string,
        public schedules?: Array<Schedule>,
        public place_id?: any,
        public id?: string
  ) { }
}
