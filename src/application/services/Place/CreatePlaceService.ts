import { CreatePlace } from '../../../core/use-cases';
import { PlaceModel } from '../../models';
import { PlaceRepository } from '../../repository/PlaceRepository';
import { makeRequest } from '../../../common/utils/makeRequest';
import cpnjValidator from '../../../common/utils/cnpjValidator';

export class CreatePlaceService implements CreatePlace {
    constructor(private readonly placeRepository: PlaceRepository) { }

    async create(data: any): Promise<object> {
        const place = await this.placeRepository.findByCnpj(data.cnpj);
        if (place) {
            throw new Error("Local ja cadastrado")
        }
        if (!cpnjValidator(data.cnpj)) {
            throw new Error('CNPJ invalido')
        }
        const numberOfCourts = data.courts.length;
        if (numberOfCourts < 1) throw new Error('Necessario ao menos uma quadra');
        data.number_of_courts = numberOfCourts;
        const validCep = await makeRequest('get', `https://ws.apicep.com/cep/${data.address.city_code}.json`);
        if (validCep.status === 400) {
            throw new Error("CEP invalido");
        }
        data.courts.map((court: any) => {
            if(court.court_place_name !== data.place_name) {
                throw new Error("Local da quadra invalido");
            }
        })
        return await this.placeRepository.create(data);
    }
}