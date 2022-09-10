import { Schedule } from '../../entities'

export interface CreateSchedule {
    create: (Schedule: Schedule) => Promise<Schedule>
}
