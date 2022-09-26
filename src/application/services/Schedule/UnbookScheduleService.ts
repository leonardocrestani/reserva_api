import { ScheduleRepository } from '../../repository/ScheduleRepository'
import { FindUserService } from '../'
import { UserRepository } from '../../repository'
import { BadRequest, NotFound, UnprocessableEntity } from '../../errors'
import { UpdateUserService } from '../User/UpdateUserService'
import mongoose from 'mongoose'
import { UnbookSchedule } from '../../../core/use-cases'
import { OutputFindScheduleDTO, OutputFindUserDTO, InputUnbookScheduleDTO } from '../../dtos'

export class UnbookScheduleService implements UnbookSchedule {
  constructor (
        private readonly scheduleRepository: ScheduleRepository,
        private readonly userRepository: UserRepository
  ) { }

  async update (id: string, userEmail?: string): Promise<void> {
    const data: InputUnbookScheduleDTO = {}
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntity('Formato de ID invalido')
    }
    const schedule : OutputFindScheduleDTO = await this.scheduleRepository.findById(id)
    if (!schedule) {
      throw new NotFound('Horario nao encontrado')
    }
    if (schedule.is_rent === false) {
      throw new BadRequest('Nao e possivel desmarcar horario nao reservado')
    }
    const getUserService = new FindUserService(this.userRepository)
    const user : OutputFindUserDTO = await getUserService.findByEmail(userEmail)
    if (schedule.is_rent === true && schedule.responsible_person_email !== user.email) {
      throw new BadRequest('Usuario desmarcando horario incorreto')
    }
    data.is_rent = false
    data.responsible_person_id = null
    data.responsible_person_full_name = null
    data.responsible_person_email = null
    const operation = await this.scheduleRepository.update(id, data)
    if (!operation) {
      throw new UnprocessableEntity('Nao foi possivel desmarcar horario')
    }
    user.schedules.map((canceledSchedule, index) => {
      if (canceledSchedule.id === schedule.id) {
        user.schedules.splice(index, 1)
      }
    })
    const updateUserService = new UpdateUserService(this.userRepository)
    await updateUserService.update(user.email, { schedules: user.schedules })
  }
}
