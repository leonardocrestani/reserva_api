import { CreateScheduleService } from '../../application/services/Schedule/CreateScheduleService';
import { FindScheduleService } from '../../application/services/Schedule/FindScheduleService';
import { BookScheduleService } from '../../application/services/Schedule/BookScheduleService';
import { ScheduleRepositoryMongoose } from '../../infra/repository/Schedule/ScheduleRepositoryMongoose';
import { ok, created, noContent, HttpResponse } from '../contracts/HttpResponse';
import { CourtRepositoryMongoose, PlaceRepositoryMongoose, UserRepositoryMongoose } from '../../infra/repository';
import { DeleteScheduleService, UnbookScheduleService } from '../../application/services';

export class ScheduleController {
    static async register(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const scheduleRepository = new ScheduleRepositoryMongoose();
        const placeRepository = new PlaceRepositoryMongoose();
        const courtRepository = new CourtRepositoryMongoose();
        const createScheduleService = new CreateScheduleService(scheduleRepository, placeRepository, courtRepository);
        const newPlace = await createScheduleService.create(body);
        return created(newPlace);
    }

    static async findById(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const scheduleRepository = new ScheduleRepositoryMongoose();
        const findScheduleService = new FindScheduleService(scheduleRepository);
        const schedule = await findScheduleService.findById(params.id);
        return ok(schedule);
    }

    static async book(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const scheduleRepository = new ScheduleRepositoryMongoose();
        const userRepository = new UserRepositoryMongoose();
        const bookScheduleService = new BookScheduleService(scheduleRepository, userRepository);
        await bookScheduleService.update(params.id, body);
        return noContent();
    }

    static async unbook(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const scheduleRepository = new ScheduleRepositoryMongoose();
        const userRepository = new UserRepositoryMongoose();
        const unbookScheduleService = new UnbookScheduleService(scheduleRepository, userRepository);
        await unbookScheduleService.update(params.id, query.userId);
        return noContent();
    }

    static async delete(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const scheduleRepository = new ScheduleRepositoryMongoose();
        const deleteScheduleService = new DeleteScheduleService(scheduleRepository);
        await deleteScheduleService.delete(params.id);
        return noContent();
    }
}