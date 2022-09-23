import { CreatePlace } from '../../../core/use-cases'
import { PlaceModel } from '../../models'
import { PlaceRepository } from '../../repository/PlaceRepository'
import { makeRequest } from '../../../common/utils/makeRequest'
import { UnprocessableEntity, Conflict, BadRequest } from '../../errors'
import cpnjValidator from '../../../common/utils/cnpjValidator'
import cnpjFormatter from '../../../common/utils/cnpjFormatter'
import { CourtRepository, ScheduleRepository } from '../../repository'
import { CreateCourtService } from '../Court/CreateCourtService'
import { InputCreatePlaceDTO, OutputCreatePlaceDTO } from '../../dtos/Place/CreatePlaceDTO'

export class CreatePlaceService implements CreatePlace {
  constructor (
        private readonly placeRepository: PlaceRepository,
        private readonly courtRepository: CourtRepository,
        private readonly scheduleRepository: ScheduleRepository
  ) { }

  async create (data: InputCreatePlaceDTO): Promise<OutputCreatePlaceDTO> {
    const { courts, ...placeFields } = data
    placeFields.cnpj = cnpjFormatter(placeFields.cnpj)
    const place = !!(await this.placeRepository.findByCnpj(placeFields.cnpj) || await this.placeRepository.findByName(placeFields.name))
    if (place) {
      throw new Conflict('Local ja cadastrado')
    }
    if (!cpnjValidator(placeFields.cnpj)) {
      throw new UnprocessableEntity('CNPJ invalido')
    }
    if (placeFields.operation_time.open_hour < 0 || placeFields.operation_time.close_hour > 23 || placeFields.operation_time.open_hour >= placeFields.operation_time.close_hour) {
      throw new BadRequest('Horario de funcionamento invalido')
    }
    const validCep = await makeRequest('get', `https://viacep.com.br/ws/${placeFields.address.city_code}/json/`)
    if (validCep.hasOwnProperty('erro')) {
      throw new UnprocessableEntity('CEP invalido')
    }
    placeFields.number_of_courts = 0
    if (courts.length > 0) {
      courts.map((court: any) => {
        if (court.place_name !== placeFields.name) {
          throw new UnprocessableEntity('Local da quadra invalido')
        }
      })
    }
    const placeData = new PlaceModel(placeFields.name, placeFields.cnpj, 0, placeFields.address, placeFields.contact, placeFields.operation_time, [])
    const newPlace = await this.placeRepository.create(placeData)
    newPlace.number_of_courts = courts.length
    const createCourtService = new CreateCourtService(this.courtRepository, this.placeRepository, this.scheduleRepository)
    if (courts.length > 0) {
      for (const court of courts) {
        const newCourt = await createCourtService.create(court)
        newPlace.courts.push(newCourt)
      }
    }
    return newPlace
  }
}
