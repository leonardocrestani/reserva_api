import { ScheduleModel } from '../models/ScheduleModel';

export interface ScheduleRepository {
    create: (schedule: ScheduleModel) => Promise<object>;
}