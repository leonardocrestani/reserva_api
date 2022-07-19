import { CreateScheduleService } from '../../application/services/Schedule/CreateScheduleService';
import { GetScheduleService } from '../../application/services/Schedule/GetScheduleService';
import { BookScheduleService } from '../../application/services/Schedule/BookScheduleService';
import { ScheduleRepositoryPrisma } from '../../infra/repository/Schedule/ScheduleRepositoryPrisma';
import { ok, created, noContent, HttpResponse } from '../contracts/HttpResponse';

export class ScheduleController {
    static async register(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const createScheduleService = new CreateScheduleService(scheduleRepository);
        const newPlace = await createScheduleService.create(body);
        return created(newPlace);
    }

    static async find(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const getScheduleService = new GetScheduleService(scheduleRepository);
        const hour = parseInt(query.hour, 10);
        const minutes = parseInt(query.minutes, 10);
        const schedule = await getScheduleService.find(query.place_name, query.court_name, hour, minutes);
        return ok(schedule);
    }

    static async update(query: any, params: any, body: any, next: any): Promise<object> {
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const bookScheduleService = new BookScheduleService(scheduleRepository);
        const hour = parseInt(query.hour, 10);
        const minutes = parseInt(query.minutes, 10);
        await bookScheduleService.update(query.court_name, query.place_name, hour, minutes, body);
        return noContent();
    }
}