import { ScheduleModel } from '../models/ScheduleModel';

export interface ScheduleRepository {
    create: (schedule: ScheduleModel) => Promise<ScheduleModel>;
    findById: (id: string) => Promise<ScheduleModel>;
    findAllByCourt: (place_court_name: string, court_name: string) => Promise<ScheduleModel[]>;
    updatePlaceName: (hour: number, place_name: string) => Promise<ScheduleModel>;
    updateCourtName: (hour: number, court_name: string) => Promise<ScheduleModel>;
    update: (id: string, data: any) => Promise<void>;
    delete: (id: string) => Promise<void>;
}