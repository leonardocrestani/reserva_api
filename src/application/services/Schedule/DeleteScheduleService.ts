import { DeleteSchedule } from '../../../core/use-cases'
import { BadRequest } from '../../errors'
import { ScheduleRepository } from '../../repository'

export class DeleteScheduleService implements DeleteSchedule {
  constructor (
        private readonly scheduleRepository: ScheduleRepository
  ) { };

  async delete (id: string): Promise<void> {
    const operation: number = await this.scheduleRepository.delete(id)
    if (!operation) {
      throw new BadRequest('Nao foi possivel excluir horario')
    }
  }
}
