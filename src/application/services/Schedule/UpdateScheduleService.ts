import { UpdateSchedule } from '../../../core/use-cases/Schedule/UpdateSchedule'
import { CourtModel } from '../../models'
import { ScheduleRepository } from '../../repository'
import { InputUpdateNamesScheduleDTO } from '../../dtos'

export class UpdateScheduleService implements UpdateSchedule {
  constructor (
        private readonly scheduleRepository: ScheduleRepository
  ) { };

  async updatePlaceAndCourtName (court: CourtModel): Promise<void> {
    await Promise.all(court.schedules.map(async (schedule: InputUpdateNamesScheduleDTO) => {
      await this.scheduleRepository.updatePlaceName(schedule.id, court.place_name)
      await this.scheduleRepository.updateCourtName(schedule.id, court.court_name)
    }))
  }
}
