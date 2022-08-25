import { CreateCourtService, DeleteCourtService, UpdateCourtService, FindCourtService } from '../../application/services';
import { CourtRepositoryPrisma, PlaceRepositoryPrisma, ScheduleRepositoryPrisma } from '../../infra/repository';
import { ok, created, HttpResponse, noContent } from '../contracts/HttpResponse';

export class CourtController {
    static async register(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const courtRepository = new CourtRepositoryPrisma();
        const placeRepository = new PlaceRepositoryPrisma();
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const createCourtService = new CreateCourtService(courtRepository, placeRepository, scheduleRepository);
        const newCourt = await createCourtService.create(body);
        return created(newCourt);
    }

    static async findById(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const courtRepository = new CourtRepositoryPrisma();
        const getCourtService = new FindCourtService(courtRepository);
        const court = await getCourtService.findById(params.id);
        return ok(court);
    }

    static async update(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const courtRepository = new CourtRepositoryPrisma();
        const placeRepository = new PlaceRepositoryPrisma();
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const updateCourtService = new UpdateCourtService(courtRepository, scheduleRepository);
        await updateCourtService.update(params.id, body);
        return noContent();
    }

    static async delete(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const courtRepository = new CourtRepositoryPrisma();
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const deleteCourtService = new DeleteCourtService(courtRepository, scheduleRepository);
        await deleteCourtService.delete(params.id);
        return noContent();
    }
}