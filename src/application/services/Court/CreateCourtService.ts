import { FindPlaceService, UpdatePlaceService } from '../'
import { CreateCourt } from '../../../core/use-cases'
import { CourtModel } from '../../models'
import { CourtRepository, PlaceRepository, ScheduleRepository } from '../../repository'
import { Conflict } from '../../errors'
import { InputCreateCourtDTO, OutputCreateCourtDTO } from '../../dtos'

export class CreateCourtService implements CreateCourt {
  constructor (
        private readonly courtRepository: CourtRepository,
        private readonly placeRepository: PlaceRepository,
        private readonly scheduleRepository: ScheduleRepository
  ) { };

  async create (data: InputCreateCourtDTO): Promise<OutputCreateCourtDTO> {
    const getPlaceService = new FindPlaceService(this.placeRepository)
    const place = await getPlaceService.findByName(data.place_name)
    if (place.courts.length !== 0) {
      place.courts.map((court) => {
        if (court.court_name === data.court_name) {
          throw new Conflict('Quadra ja existente')
        }
      })
    };
    data.place_id = place.id
    const courtData = new CourtModel(data.place_name, data.court_name, [], data.place_id)
    const court: OutputCreateCourtDTO = await this.courtRepository.create(courtData)
    await this.placeRepository.updateNumberOfCourts(data.place_name)
    const updatePlaceService = new UpdatePlaceService(this.placeRepository, this.courtRepository, this.scheduleRepository)
    place.courts.push(court)
    await updatePlaceService.update(place.name, { courts: place.courts })
    return court
  }
}
