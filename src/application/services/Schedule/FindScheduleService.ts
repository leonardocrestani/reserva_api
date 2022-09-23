import { FindSchedule } from '../../../core/use-cases/Schedule/FindSchedule'
import { ScheduleRepository } from '../../repository/ScheduleRepository'
import { NotFound } from '../../errors'
import { OutputFindScheduleDTO } from '../../dtos'

export class FindScheduleService implements FindSchedule {
  constructor (
        private readonly scheduleRepository: ScheduleRepository
  ) { }

  async findById (id: string): Promise<OutputFindScheduleDTO> {
    const schedule = await this.scheduleRepository.findById(id)
    if (!schedule) {
      throw new NotFound('Horario nao encontrado')
    }
    return schedule
  }
}
