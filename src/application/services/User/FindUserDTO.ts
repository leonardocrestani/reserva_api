import { ScheduleModel } from '../../models'

type OutputFindUserDTO = {
    id?: string,
    first_name: string,
    last_name: string,
    cpf: string,
    genre: string,
    country: string,
    email: string,
    phone_number: string,
    schedules: Array<ScheduleModel>
    created_at?: Date,
    updated_at?: Date
  }

export { OutputFindUserDTO }
