import { UpdatePlace } from "../../../core/use-cases";
import { BadRequest, NotFound, UnprocessableEntity } from "../../errors";
import { PlaceRepository } from "../../repository";
import cnpjValidator from "../../../common/utils/cnpjValidator";
import { makeRequest } from "../../../common/utils/makeRequest";

export class UpdatePlaceService implements UpdatePlace {
    constructor(private readonly placeRepository: PlaceRepository) { }

    async update(cnpj: string, data: any): Promise<void> {
        const place = await this.placeRepository.findByCnpj(cnpj);
        if(!place) {
            throw new NotFound("Local nao encontrado");
        }
        if(data.hasOwnProperty('place_name')) {
            // chamar funcao de update do court para atualizar o nome tambem
        }
        if (data.hasOwnProperty('cnpj') && !cnpjValidator(data.cnpj)) {
            throw new UnprocessableEntity('CNPJ invalido');
        }
        if (data.hasOwnProperty('operation_time') && data.operation_time.open_hour < 0 || data.operation_time.close_hour > 23 || data.operation_time.open_hour >= data.operation_time.close_hour) {
            throw new BadRequest("Horario de funcionamento invalido");
        }
        if(data.hasOwnProperty('address')) {
            const validCep = await makeRequest('get', `https://cep.awesomeapi.com.br/json/${data.address.city_code}`);
            if (validCep.status === 400) {
                throw new UnprocessableEntity("CEP invalido");
            }
        }
        await this.placeRepository.update(cnpj, data);
    }
}