import { CreatePlace } from '../../../core/use-cases';
import { PlaceModel } from '../../models';
import { PlaceRepository } from '../../repository/PlaceRepository';
import { makeRequest } from '../../../common/utils/makeRequest';
import { UnprocessableEntity, Conflict, BadRequest } from '../../errors';
import cpnjValidator from '../../../common/utils/cnpjValidator';
import cnpjFormatter from '../../../common/utils/cnpjFormatter';
import { CourtRepository, ScheduleRepository } from '../../repository';
import { CreateCourtService } from '../Court/CreateCourtService';

export class CreatePlaceService implements CreatePlace {
    constructor(
        private readonly placeRepository: PlaceRepository,
        private readonly courtRepository: CourtRepository,
        private readonly scheduleRepository: ScheduleRepository
    ) { }

    async create(data: any): Promise<PlaceModel> {
        const {courts, ...placeData} = data;
        placeData.cnpj = cnpjFormatter(placeData.cnpj);
        const place = await this.placeRepository.findByCnpj(placeData.cnpj) || await this.placeRepository.findByName(placeData.name) ? true : false;
        if (place) {
           throw new Conflict("Local ja cadastrado");
        }
        if (!cpnjValidator(placeData.cnpj)) {
            throw new UnprocessableEntity('CNPJ invalido');
        }
        if (placeData.operation_time.open_hour < 0 || placeData.operation_time.close_hour > 23 || placeData.operation_time.open_hour >= placeData.operation_time.close_hour) {
            throw new BadRequest("Horario de funcionamento invalido");
        }
        const validCep = await makeRequest('get', `https://cep.awesomeapi.com.br/json/${placeData.address.city_code}`);
        if (validCep.status === 400) {
            throw new UnprocessableEntity("CEP invalido");
        }
        placeData.number_of_courts = 0;
        if(courts.length > 0) {
            courts.map((court: any) => {
                if (court.place_name !== placeData.name) {
                    throw new UnprocessableEntity("Local da quadra invalido");
                }
            });
        }
        const newPlace: any = await this.placeRepository.create(placeData);
        newPlace.number_of_courts = courts.length;
        const createCourtService = new CreateCourtService(this.courtRepository, this.placeRepository, this.scheduleRepository);
        if(courts.length > 0) {
            for (const court of courts) {
                const newCourt = await createCourtService.create(court);
                newPlace.courts.push(newCourt.id);
            }
        }
        return newPlace;
    }
}