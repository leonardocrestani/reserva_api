import { Schedule } from '../../entities';

export interface FindSchedule {
    find: (place_name: string, court_name: string, hour: number, minutes: number) => Promise<Schedule>
}