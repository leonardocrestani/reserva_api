import { UpdateSchedule } from '../../../core/use-cases/Schedule/UpdateSchedule'
import { CourtModel } from '../../models'
import { ScheduleRepository } from '../../repository'

export class UpdateScheduleService implements UpdateSchedule {
  constructor (
        private readonly scheduleRepository: ScheduleRepository
  ) { };

  async updatePlaceAndCourtName (court: CourtModel): Promise<void> {
    for (const schedule of court.schedules) {
      await this.scheduleRepository.updatePlaceName(schedule.id, court.place_name)
      await this.scheduleRepository.updateCourtName(schedule.id, court.court_name)
    }
  }
}
