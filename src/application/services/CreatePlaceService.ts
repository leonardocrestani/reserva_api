import { CreatePlace } from '../../core/use-cases';
import { PlaceModel } from '../models';
import { PlaceRepository } from '../repository/PlaceRepository';

export class CreatePlaceService implements CreatePlace {
    constructor(private readonly placeRepository: PlaceRepository) { }

    async execute(data: PlaceModel): Promise<object> {
        if (data.number_of_courts < 1) throw new Error('Numero de quadras invalido');
        // validacao de cep

        return await this.placeRepository.create(data);
    }
}