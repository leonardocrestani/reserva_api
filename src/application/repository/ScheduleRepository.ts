import { ScheduleModel } from '../models/ScheduleModel';

export interface ScheduleRepository {
    create: (schedule: ScheduleModel) => Promise<ScheduleModel>;
    find: (place_court_name: string, court_name: string, hour: number) => Promise<ScheduleModel>;
    findAllByCourt: (place_court_name: string, court_name: string) => Promise<ScheduleModel[]>;
    updatePlaceName: (hour: number, place_name: string) => Promise<ScheduleModel>;
    updateCourtName: (hour: number, court_name: string) => Promise<ScheduleModel>;
    update: (hour: number, data: any) => Promise<void>;
}