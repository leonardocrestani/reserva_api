import { CreateCourtService } from '../../application/services';
import { FindCourtService } from '../../application/services/Court/FindCourtService';
import { CourtRepositoryPrisma, PlaceRepositoryPrisma } from '../../infra/repository';
import { ok, created, HttpResponse } from '../contracts/HttpResponse';

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
        const placeRepository = new PlaceRepositoryPrisma()
        const getCourtService = new FindCourtService(courtRepository, placeRepository);
        const court = await getCourtService.find(query.place_court_name, query.court_name);
        return ok(court);
    }
}