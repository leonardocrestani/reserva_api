import { ScheduleModel, UserModel } from '../../application/models'

export default class UserAdapter {
  static create (
    firstName: string,
    lastName: string,
    cpf: string,
    genre: string,
    country: string,
    email: string,
    password: string,
    phoneNumber: string,
    schedules: Array<ScheduleModel>,
    id?: string
  ) {
    return new UserModel(firstName, lastName, cpf, genre, country, email, password, phoneNumber, schedules, id)
  }
}
