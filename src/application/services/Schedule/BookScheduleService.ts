import { BookSchedule } from '../../../core/use-cases/Schedule/BookSchedule'
import { ScheduleRepository } from '../../repository/ScheduleRepository'
import { FindUserService } from '../'
import { UserRepository } from '../../repository'
import { Conflict, NotFound, UnprocessableEntity } from '../../errors'
import { UpdateUserService } from '../User/UpdateUserService'
import mongoose from 'mongoose'
import { InputBookScheduleDTO, OutputBookScheduleDTO, OutputFindUserDTO } from '../../dtos'

export class BookScheduleService implements BookSchedule {
  constructor (
        private readonly scheduleRepository: ScheduleRepository,
        private readonly userRepository: UserRepository
  ) { }

  async update (id: string, data: InputBookScheduleDTO): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new UnprocessableEntity('Formato de ID incorreto')
    }
    const schedule = await this.scheduleRepository.findById(id)
    if (!schedule) {
      throw new NotFound('Horario nao encontrado')
    }
    if (schedule.is_rent === true) {
      throw new Conflict('Horario ja reservado')
    }
    data.is_rent = true
    const getUserService = new FindUserService(this.userRepository)
    const user : OutputFindUserDTO = await getUserService.findByEmail(data.responsible_person_email)
    data.responsible_person_id = user.id
    const fullName = user.first_name.concat(' ', `${user.last_name}`)
    data.responsible_person_full_name = fullName
    const bookedSchedule : OutputBookScheduleDTO = await this.scheduleRepository.update(id, data)
    if (!bookedSchedule) {
      throw new UnprocessableEntity('Nao foi possivel reservar horario')
    }
    user.schedules.push(bookedSchedule)
    const updateUserService = new UpdateUserService(this.userRepository)
    await updateUserService.update(user.email, { schedules: user.schedules })
  }
}
