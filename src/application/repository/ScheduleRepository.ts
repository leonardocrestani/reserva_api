import { ScheduleModel } from '../models/ScheduleModel';

export interface ScheduleRepository {
    create: (schedule: ScheduleModel) => Promise<ScheduleModel>;
    find: (court_id: string, hour: number, minutes: number) => Promise<ScheduleModel>
    update: (schedule_id: string, data: any) => Promise<void>;
}