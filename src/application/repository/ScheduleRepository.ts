import { ScheduleModel } from '../models/ScheduleModel';

export interface ScheduleRepository {
    create: (schedule: ScheduleModel) => Promise<object>;
    find: (court_id: string, hour: number, minutes: number) => Promise<any>
    update: (schedule_id: string, data: any) => Promise<void>;
}