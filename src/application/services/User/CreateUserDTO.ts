import { ScheduleModel } from '../../models'

type InputCreateUserDto = {
  first_name: string,
  last_name: string,
  cpf: string,
  genre: string,
  country: string,
  email: string,
  password: string,
  phone_number: string,
  schedules: Array<ScheduleModel>
}

type OutputCreateUserDTO = {
  user: {
    id?: string,
    first_name: string,
    last_name: string,
    cpf: string,
    genre: string,
    country: string,
    email: string,
    phone_number: string,
    schedules: Array<ScheduleModel>,
    created_at?: Date,
    updated_at?: Date
  },
  access_token: string
}

export { InputCreateUserDto, OutputCreateUserDTO }
