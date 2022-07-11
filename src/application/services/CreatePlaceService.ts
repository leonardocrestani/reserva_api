import { CreatePlace } from '../../core/use-cases';
import { PlaceModel } from '../models';
import { PlaceRepository } from '../repository/PlaceRepository';

export class CreatePlaceService implements CreatePlace {
    constructor(private readonly placeRepository: PlaceRepository) { }

    async execute(data: PlaceModel): Promise<object> {
        return await this.placeRepository.create(data);
    }
}