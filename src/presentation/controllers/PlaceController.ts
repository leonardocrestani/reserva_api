import { CreatePlaceService, UpdatePlaceService } from '../../application/services';
import { FindPlaceService, DeletePlaceService } from '../../application/services';
import { CourtRepositoryPrisma, PlaceRepositoryPrisma, ScheduleRepositoryPrisma } from '../../infra/repository';
import { ok, created, HttpResponse, noContent } from '../contracts/HttpResponse';

export class PlaceController {
    static async register(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const placeRepository = new PlaceRepositoryPrisma();
        const createPlaceService = new CreatePlaceService(placeRepository);
        const newPlace = await createPlaceService.create(body);
        return created(newPlace);
    }

    static async findAll(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const placeRepository = new PlaceRepositoryPrisma();
        const getPlaceService = new FindPlaceService(placeRepository);
        const limit = parseInt(query.limit, 10);
        const offset = parseInt(query.offset, 10);
        const places = await getPlaceService.findAll(limit, offset);
        return ok(places);
    }

    static async findByName(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const placeRepository = new PlaceRepositoryPrisma();
        const getPlaceService = new FindPlaceService(placeRepository);
        const place = await getPlaceService.findByName(params.place_name);
        return ok(place);
    }

    static async update(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const placeRepository = new PlaceRepositoryPrisma();
        const courtRepository = new CourtRepositoryPrisma();
        const scheduleRepository = new ScheduleRepositoryPrisma();
        const updatePlaceService = new UpdatePlaceService(placeRepository, courtRepository, scheduleRepository);
        await updatePlaceService.update(params.place_name, body);
        return noContent();
    }

    static async delete(query: any, params: any, body: any, next: any): Promise<HttpResponse> {
        const placeRepository = new PlaceRepositoryPrisma();
        const deletePlaceService = new DeletePlaceService(placeRepository);
        await deletePlaceService.delete(params.place_name);
        return noContent();
    }
}