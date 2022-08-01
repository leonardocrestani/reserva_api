import { Schedule } from '../../entities';

export interface FindSchedule {
    findById: (id: string) => Promise<Schedule>
}