import { DeleteUser } from '../../../core/use-cases'
import { NotFound } from '../../errors'
import { ScheduleRepository, UserRepository } from '../../repository'
import { UnbookScheduleService } from '../Schedule/UnbookScheduleService'

export class DeleteUserService implements DeleteUser {
  constructor (
        private readonly userRepository: UserRepository,
        private readonly scheduleRepository: ScheduleRepository
  ) { }

  async remove (email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new NotFound('Nao foi possivel encontrar usuario')
    }
    const unbookScheduleService = new UnbookScheduleService(this.scheduleRepository, this.userRepository)
    for (const schedule of user.schedules) {
      await unbookScheduleService.update(schedule.id)
    }
    await this.userRepository.remove(email)
  }
}
