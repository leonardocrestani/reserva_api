import { UpdateCourt } from '../../../core/use-cases'
import { CourtRepository, PlaceRepository, ScheduleRepository } from '../../repository'
import { Conflict, NotFound } from '../../errors'
import { UpdateScheduleService } from '../Schedule/UpdateScheduleService'
import { PlaceModel } from '../../models'
import { FindPlaceService } from '../Place/FindPlaceService'
import { InputUpdateCourtDTO, OutputFindCourtDTO } from '../../dtos'

export class UpdateCourtService implements UpdateCourt {
  constructor (
        private readonly courtRepository: CourtRepository,
        private readonly placeRepository: PlaceRepository,
        private readonly scheduleRepository: ScheduleRepository
  ) { };

  async update (id: string, data: InputUpdateCourtDTO): Promise<void> {
    const court : OutputFindCourtDTO = await this.courtRepository.findById(id)
    if (!court) {
      throw new NotFound('Quadra nao encontrada')
    }
    const findPlaceService = new FindPlaceService(this.placeRepository)
    const place = await findPlaceService.findById(court.place_id)
    place.courts.map((court) => {
      if (data.court_name === court.court_name) {
        throw new Conflict('Quadra ja existente')
      }
    })
    const updatedCourt = await this.courtRepository.update(court.id, data)
    if (data.court_name) {
      const updateScheduleService = new UpdateScheduleService(this.scheduleRepository)
      await updateScheduleService.updatePlaceAndCourtName(updatedCourt)
    }
  }

  async updatePlaceName (place: PlaceModel): Promise<void> {
    await Promise.all(place.courts.map(async court => {
      const courtId : string = court.toString()
      const courtUpdated = await this.courtRepository.updatePlaceName(courtId, place.name)
      const updateScheduleService = new UpdateScheduleService(this.scheduleRepository)
      await updateScheduleService.updatePlaceAndCourtName(courtUpdated)
    }))
  }
}
