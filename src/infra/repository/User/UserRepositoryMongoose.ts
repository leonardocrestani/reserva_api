import UserSchema from '../../database/models/User'
import { UserRepository } from '../../../application/repository'
import { UserModel } from '../../../application/models'

export class UserRepositoryMongoose implements UserRepository {
  async create (data: UserModel): Promise<UserModel> {
    return await UserSchema.create(data)
  }

  async findByEmail (email: string): Promise<UserModel> {
    return await UserSchema.findOne({ email }).populate('schedules')
  }

  async findById (id: string): Promise<UserModel> {
    return await UserSchema.findById(id)
  }

  async update (email: string, data: object): Promise<number> {
    return await UserSchema.findOneAndUpdate({ email }, data)
  }

  async remove (email: string): Promise<UserModel> {
    return await UserSchema.findOneAndDelete({ email })
  }
}
