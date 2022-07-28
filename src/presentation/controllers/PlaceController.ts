import { CreatePlaceService, UpdatePlaceService } from '../../application/services';
import { FindPlaceService, DeletePlaceService } from '../../application/services';
import { PlaceRepositoryPrisma } from '../../infra/repository';
import { ok, created, HttpResponse, noContent } from '../contracts/HttpResponse';

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

    static async update(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const prismaRepository = new PlaceRepositoryPrisma();
        const updatePlaceService = new UpdatePlaceService(prismaRepository);
        await updatePlaceService.update(query.cnpj, body);
        return noContent();
    }

    static async delete(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const prismaRepository = new PlaceRepositoryPrisma();
        const deletePlaceService = new DeletePlaceService(prismaRepository);
        await deletePlaceService.delete(query.cnpj);
        return noContent();
    }
}