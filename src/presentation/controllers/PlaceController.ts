import { CreatePlaceService } from '../../application/services';
import { GetPlaceService } from '../../application/services';
import { PlaceRepositoryPrisma } from '../../infra/repository';
import { ok, created } from '../contracts/HttpResponse';

export class PlaceController {
    static async register(query: any, params: any, body: any, next: any): Promise<object> {
        const prismaRepository = new PlaceRepositoryPrisma();
        const placeService = new CreatePlaceService(prismaRepository);
        const newPlace = await placeService.create(body);
        return created(newPlace);
    }

    static async find(query: any, params: any, body: any, next: any): Promise<object> {
        const prismaRepository = new PlaceRepositoryPrisma();
        const placeService = new GetPlaceService(prismaRepository);
        const place = await placeService.findByCnpj(query.cnpj);
        return ok(place);
    }
}