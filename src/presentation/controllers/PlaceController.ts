import { CreatePlaceService } from '../../application/services';
import { PlaceRepositoryPrisma } from '../../infra/repository';
import { ok, created } from '../contracts/HttpResponse';

export class PlaceController {
    static async register(query: any, params: any, body: any, next: any): Promise<object> {
        const prismaRepository = new PlaceRepositoryPrisma();
        const placeService = new CreatePlaceService(prismaRepository);
        const newPlace = await placeService.execute(body);
        return created(newPlace);
    }
}