import { DeletePlace } from '../../../core/use-cases'
import { BadRequest, NotFound } from '../../errors'
import { CourtRepository, PlaceRepository, ScheduleRepository } from '../../repository'
import { DeleteCourtService } from '../Court/DeleteCourtService'
import { OutputFindPlaceDTO } from '../../dtos'

export class DeletePlaceService implements DeletePlace {
  constructor (
        private readonly placeRepository: PlaceRepository,
        private readonly courtRepository: CourtRepository,
        private readonly scheduleRepository: ScheduleRepository
  ) { }

  async delete (name: string): Promise<void> {
    const place : OutputFindPlaceDTO = await this.placeRepository.findByName(name)
    if (!place) {
      throw new NotFound('Local nao encontrado')
    }
    const deleteCourtService = new DeleteCourtService(this.courtRepository, this.scheduleRepository, this.placeRepository)
    for (const court of place.courts) {
      await deleteCourtService.delete(court.id)
    }
    const operation: number = await this.placeRepository.delete(name)
    if (!operation) {
      throw new BadRequest('Nao foi possivel deletar o local')
    }
  }
}
