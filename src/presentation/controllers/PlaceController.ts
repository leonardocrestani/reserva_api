import { CreatePlaceService } from '../../application/services';
import { FindPlaceService } from '../../application/services';
import { PlaceRepositoryPrisma } from '../../infra/repository';
import { ok, created, HttpResponse } from '../contracts/HttpResponse';

export class PlaceController {
    static async register(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const prismaRepository = new PlaceRepositoryPrisma();
        const createPlaceService = new CreatePlaceService(prismaRepository);
        const newPlace = await createPlaceService.create(body);
        return created(newPlace);
    }

    static async findAll(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const prismaRepository = new PlaceRepositoryPrisma();
        const getPlaceService = new FindPlaceService(prismaRepository);
        const limit = parseInt(query.limit, 10);
        const offset = parseInt(query.offset, 10);
        const places = await getPlaceService.findAll(limit, offset);
        return ok(places);
    }

    static async findOne(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const prismaRepository = new PlaceRepositoryPrisma();
        const getPlaceService = new FindPlaceService(prismaRepository);
        const place = await getPlaceService.findByName(params.place_name);
        return ok(place);
    }
}