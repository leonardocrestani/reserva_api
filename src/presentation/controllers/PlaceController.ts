import { CreatePlaceService } from '../../application/services';
import { GetPlaceService } from '../../application/services';
import { PlaceRepositoryPrisma } from '../../infra/repository';
import { ok, created, HttpResponse } from '../contracts/HttpResponse';

export class PlaceController {
    static async register(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const prismaRepository = new PlaceRepositoryPrisma();
        const createPlaceService = new CreatePlaceService(prismaRepository);
        const newPlace = await createPlaceService.create(body);
        return created(newPlace);
    }

    static async find(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const prismaRepository = new PlaceRepositoryPrisma();
        const getPlaceService = new GetPlaceService(prismaRepository);
        const place = await getPlaceService.findByName(query.place_name);
        return ok(place);
    }
}