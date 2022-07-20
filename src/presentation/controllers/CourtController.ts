import { CreateCourtService } from '../../application/services';
import { GetCourtService } from '../../application/services/Court/GetCourtService';
import { CourtRepositoryPrisma } from '../../infra/repository';
import { ok, created, HttpResponse } from '../contracts/HttpResponse';

export class CourtController {
    static async register(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const courtRepository = new CourtRepositoryPrisma()
        const createCourtService = new CreateCourtService(courtRepository);
        const newCourt = await createCourtService.create(body);
        return created(newCourt);
    }

    static async find(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const courtRepository = new CourtRepositoryPrisma()
        const getCourtService = new GetCourtService(courtRepository);
        const court = await getCourtService.find(query.court_place_name, query.court_name);
        return ok(court);
    }
}