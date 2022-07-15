import { CreateCourtService } from '../../application/services';
import { GetCourtService } from '../../application/services/Court/GetCourtService';
import { CourtRepositoryPrisma } from '../../infra/repository';
import { ok, created } from '../contracts/HttpResponse';

export class CourtController {
    static async register(query: any, params: any, body: any, next: any): Promise<object> {
        const courtRepository = new CourtRepositoryPrisma()
        const courtService = new CreateCourtService(courtRepository);
        const newCourt = await courtService.create(body);
        return created(newCourt);
    }

    static async find(query: any, params: any, body: any, next: any): Promise<object> {
        const courtRepository = new CourtRepositoryPrisma()
        const courtService = new GetCourtService(courtRepository);
        const court = await courtService.find(query.place_name, query.court_name);
        return ok(court);
    }
}