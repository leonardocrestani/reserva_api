import { CreatePlace } from '../../core/use-cases';
import { PlaceModel } from '../models';
import { PlaceRepository } from '../repository/PlaceRepository';
import { AxiosAdapter } from '../../presentation/adapters/AxiosAdapter';
import cpnjValidator from '../../common/utils/cnpjValidator';

export class CreatePlaceService implements CreatePlace {
    constructor(private readonly placeRepository: PlaceRepository) { }

    async create(data: PlaceModel): Promise<object> {
        const place = await this.placeRepository.findByCnpj(data.cnpj);
        if (place) {
            throw new Error("Local ja cadastrado")
        }
        if (!cpnjValidator(data.cnpj)) {
            throw new Error('CNPJ invalido')
        }
        if (data.number_of_courts < 1) throw new Error('Numero de quadras invalido');
        const validCep = await AxiosAdapter.handle('get', `https://ws.apicep.com/cep/${data.address.city_code}.json`);
        if (validCep.status === 400) {
            throw new Error("CEP invalido");
        }
        return await this.placeRepository.create(data);
    }
}