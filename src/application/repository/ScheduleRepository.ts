import { ScheduleModel } from '../models/ScheduleModel';

export interface ScheduleRepository {
    create: (schedule: ScheduleModel) => Promise<ScheduleModel>;
    find: (place_court_name: string, court_name: string, hour: number) => Promise<ScheduleModel>
    update: (hour: number, data: any) => Promise<void>;
}