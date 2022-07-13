import { CreatePlace } from '../../core/use-cases';
import { PlaceModel } from '../models';
import { PlaceRepository } from '../repository/PlaceRepository';
import { AxiosAdapter } from '../../presentation/adapters/AxiosAdapter';

export class CreatePlaceService implements CreatePlace {
    constructor(private readonly placeRepository: PlaceRepository) { }

    async execute(data: PlaceModel): Promise<object> {
        if (data.number_of_courts < 1) throw new Error('Numero de quadras invalido');
        const validCep = await AxiosAdapter.handle('get', `https://ws.apicep.com/cep/${data.address.city_code}.json`);
        if(validCep.status === 400) {
            throw new Error("CEP invalido");
        }
        const place = await this.placeRepository.findByName(data.place_name);
        if(place) {
            throw new Error("Local ja cadastrado")
        }
        return await this.placeRepository.create(data);
    }
}