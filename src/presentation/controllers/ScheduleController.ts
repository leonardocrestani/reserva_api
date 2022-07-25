import { CreateScheduleService } from '../../application/services/Schedule/CreateScheduleService';
import { FindScheduleService } from '../../application/services/Schedule/FindScheduleService';
import { BookScheduleService } from '../../application/services/Schedule/BookScheduleService';
import { ScheduleRepositoryPrisma } from '../../infra/repository/Schedule/ScheduleRepositoryPrisma';
import { ok, created, noContent, HttpResponse } from '../contracts/HttpResponse';
import { CourtRepositoryPrisma, PlaceRepositoryPrisma, UserRepositoryPrisma } from '../../infra/repository';

export class ScheduleController {
    static async register(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const placeRepository = new PlaceRepositoryPrisma();
        const createScheduleService = new CreateScheduleService(scheduleRepository, placeRepository);
        const newPlace = await createScheduleService.create(body);
        return created(newPlace);
    }

    static async find(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const courtRepository = new CourtRepositoryPrisma();
        const placeRepository = new PlaceRepositoryPrisma();
        const getScheduleService = new FindScheduleService(scheduleRepository, courtRepository, placeRepository);
        const hour = parseInt(query.hour, 10);
        const schedule = await getScheduleService.find(query.place_name, query.court_name, hour);
        return ok(schedule);
    }

    static async update(query: any, params: any, body: any, next: any): Promise<object> {
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const placeRepository = new PlaceRepositoryPrisma();
        const userRepository = new UserRepositoryPrisma();
        const bookScheduleService = new BookScheduleService(scheduleRepository, placeRepository, userRepository);
        const hour = parseInt(query.hour, 10);
        await bookScheduleService.update(query.place_name, query.court_name, hour, body);
        return noContent();
    }
}