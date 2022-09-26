import { UpdatePlace } from '../../../core/use-cases'
import { BadRequest, NotFound, UnprocessableEntity } from '../../errors'
import { CourtRepository, PlaceRepository, ScheduleRepository } from '../../repository'
import cnpjValidator from '../../../common/utils/cnpjValidator'
import { makeRequest } from '../../../common/utils/makeRequest'
import { UpdateCourtService } from '../Court/UpdateCourtService'
import { InputUpdatePlaceDTO } from '../../dtos/Place/UpdatePlaceDTO'
import cnpjFormatter from '../../../common/utils/cnpjFormatter'

export class UpdatePlaceService implements UpdatePlace {
  constructor (
        private readonly placeRepository: PlaceRepository,
        private readonly courtRepository: CourtRepository,
        private readonly scheduleRepository: ScheduleRepository
  ) { }

  async update (name: string, data: InputUpdatePlaceDTO): Promise<void> {
    const place = await this.placeRepository.findByName(name)
    if (!place) {
      throw new NotFound('Local nao encontrado')
    }
    if (data.cnpj) {
      if (!cnpjValidator(data.cnpj)) {
        throw new UnprocessableEntity('CNPJ invalido')
      }
      data.cnpj = cnpjFormatter(data.cnpj)
    }
    if (data.operation_time) {
      if (data.operation_time.open_hour < 0 || data.operation_time.close_hour > 23 || data.operation_time.open_hour >= data.operation_time.close_hour) {
        throw new BadRequest('Horario de funcionamento invalido')
      }
    }
    if (data.address) {
      const validCep = await makeRequest('get', `https://viacep.com.br/ws/${data.address.city_code}/json/`)
      if (validCep.hasOwnProperty('erro')) {
        throw new UnprocessableEntity('CEP invalido')
      }
    }
    const placeUpdated = await this.placeRepository.update(name, data)
    if (data.name) {
      const updateCourtService = new UpdateCourtService(this.courtRepository, this.placeRepository, this.scheduleRepository)
      await updateCourtService.updatePlaceName(placeUpdated)
    }
  }
}
