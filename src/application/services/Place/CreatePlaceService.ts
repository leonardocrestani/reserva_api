import { CreatePlace } from '../../../core/use-cases';
import { PlaceModel } from '../../models';
import { PlaceRepository } from '../../repository/PlaceRepository';
import { makeRequest } from '../../../common/utils/makeRequest';
import { UnprocessableEntity, Conflict, BadRequest } from '../../errors';
import cpnjValidator from '../../../common/utils/cnpjValidator';

export class CreatePlaceService implements CreatePlace {
    constructor(private readonly placeRepository: PlaceRepository) { }

    async create(data: any): Promise<PlaceModel> {
        const place = await this.placeRepository.findByCnpj(data.cnpj);
        if (place) {
            throw new Conflict("Local ja cadastrado");
        }
        if (!cpnjValidator(data.cnpj)) {
            throw new UnprocessableEntity('CNPJ invalido');
        }
        if (data.operation_time.open_hour < 0 || data.operation_time.close_hour > 23 || data.operation_time.open_hour >= data.operation_time.close_hour) {
            throw new BadRequest("Horario de funcionamento invalido");
        }
        const numberOfCourts = data.courts.length;
        data.number_of_courts = numberOfCourts;
        const validCep = await makeRequest('get', `https://cep.awesomeapi.com.br/json/${data.address.city_code}`);
        if (validCep.status === 400) {
            throw new UnprocessableEntity("CEP invalido");
        }
        data.courts.map((court: any) => {
            if (court.court_place_name !== data.place_name) {
                throw new UnprocessableEntity("Local da quadra invalido");
            }
        })
        return await this.placeRepository.create(data);
    }
}