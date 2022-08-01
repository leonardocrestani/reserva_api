import { CreateCourtService, DeleteCourtService, UpdateCourtService, FindCourtService } from '../../application/services';
import { CourtRepositoryPrisma, PlaceRepositoryPrisma, ScheduleRepositoryPrisma } from '../../infra/repository';
import { ok, created, HttpResponse, noContent } from '../contracts/HttpResponse';

export class CourtController {
    static async register(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const courtRepository = new CourtRepositoryPrisma();
        const placeRepository = new PlaceRepositoryPrisma()
        const createCourtService = new CreateCourtService(courtRepository, placeRepository);
        const newCourt = await createCourtService.create(body);
        return created(newCourt);
    }

    static async find(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const courtRepository = new CourtRepositoryPrisma();
        const placeRepository = new PlaceRepositoryPrisma();
        const getCourtService = new FindCourtService(courtRepository, placeRepository);
        const court = await getCourtService.find(query.place_court_name, query.court_name);
        return ok(court);
    }

    static async update(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const courtRepository = new CourtRepositoryPrisma();
        const placeRepository = new PlaceRepositoryPrisma();
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const updateCourtService = new UpdateCourtService(courtRepository, placeRepository, scheduleRepository);
        await updateCourtService.update(query.place_name, query.court_name, body);
        return noContent();
    }

    static async delete(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const courtRepository = new CourtRepositoryPrisma();
        const placeRepository = new PlaceRepositoryPrisma();
        const deleteCourtService = new DeleteCourtService(courtRepository, placeRepository);
        await deleteCourtService.delete(query.place_name, query.court_name);
        return noContent();
    }
}