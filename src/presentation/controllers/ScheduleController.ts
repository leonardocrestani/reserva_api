import { CreateScheduleService } from '../../application/services/Schedule/CreateScheduleService';
import { ScheduleRepositoryPrisma } from '../../infra/repository/Schedule/ScheduleRepositoryPrisma';
import { ok, created } from '../contracts/HttpResponse';

export class ScheduleController {
    static async register(query: any, params: any, body: any, next: any): Promise<object> {
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const scheduleService = new CreateScheduleService(scheduleRepository);
        const newPlace = await scheduleService.create(body);
        return created(newPlace);
    }
}