import { CreateScheduleService } from '../../application/services/Schedule/CreateScheduleService';
import { FindScheduleService } from '../../application/services/Schedule/FindScheduleService';
import { BookScheduleService } from '../../application/services/Schedule/BookScheduleService';
import { ScheduleRepositoryPrisma } from '../../infra/repository/Schedule/ScheduleRepositoryPrisma';
import { ok, created, noContent, HttpResponse } from '../contracts/HttpResponse';
import { CourtRepositoryPrisma, PlaceRepositoryPrisma, UserRepositoryPrisma } from '../../infra/repository';
import { DeleteScheduleService } from '../../application/services';

export class ScheduleController {
    static async register(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const placeRepository = new PlaceRepositoryPrisma();
        const createScheduleService = new CreateScheduleService(scheduleRepository, placeRepository);
        const newPlace = await createScheduleService.create(body);
        return created(newPlace);
    }

    static async findById(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const findScheduleService = new FindScheduleService(scheduleRepository);
        const schedule = await findScheduleService.findById(params.id);
        return ok(schedule);
    }

    static async update(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const placeRepository = new PlaceRepositoryPrisma();
        const userRepository = new UserRepositoryPrisma();
        const bookScheduleService = new BookScheduleService(scheduleRepository, userRepository);
        await bookScheduleService.update(params.id, body);
        return noContent();
    }

    static async delete(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const deleteScheduleService = new DeleteScheduleService(scheduleRepository);
        await deleteScheduleService.delete(params.id);
        return noContent();
    }
}