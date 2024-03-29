import { DeleteCourt } from '../../../core/use-cases'
import { OutputFindCourtDTO, OutputFindPlaceDTO } from '../../dtos'
import { NotFound } from '../../errors'
import { CourtRepository, PlaceRepository, ScheduleRepository } from '../../repository'
import { FindPlaceService } from '../Place/FindPlaceService'
import { UpdatePlaceService } from '../Place/UpdatePlaceService'
import { DeleteScheduleService } from '../Schedule/DeleteScheduleService'

export class DeleteCourtService implements DeleteCourt {
  constructor (
        private readonly courtRepository: CourtRepository,
        private readonly scheduleRepository: ScheduleRepository,
        private readonly placeRepository: PlaceRepository
  ) { };

  async delete (id: string): Promise<void> {
    const court : OutputFindCourtDTO = await this.courtRepository.findById(id)
    if (!court) {
      throw new NotFound('Quadra nao encontrada')
    }
    const deleteScheduleService = new DeleteScheduleService(this.scheduleRepository)
    for (const schedule of court.schedules) {
      await deleteScheduleService.delete(schedule.id)
    }
    const findPlaceService = new FindPlaceService(this.placeRepository)
    const place : OutputFindPlaceDTO = await findPlaceService.findById(court.place_id)
    place.courts.map((deletedCourt, index) => {
      if (deletedCourt.id === court.id) {
        place.courts.splice(index, 1)
      }
    })
    const updatePlaceService = new UpdatePlaceService(this.placeRepository, this.courtRepository, this.scheduleRepository)
    await this.courtRepository.delete(id)
    await updatePlaceService.update(place.name, { courts: place.courts })
  }
}
