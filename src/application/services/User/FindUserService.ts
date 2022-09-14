import { UserModel } from '../../models'
import { FindUser } from '../../../core/use-cases'
import { UserRepository } from '../../repository'
import { NotFound } from '../../errors/NotFound'

export class FindUserService implements FindUser {
  constructor (private readonly userRepository: UserRepository) { }

  async findByEmail (email: string): Promise<UserModel> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new NotFound('Usuario nao encontrado')
    }
    return user
  };

  async findById (id: string): Promise<UserModel> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new NotFound('Usuario nao encontrado')
    }
    return user
  };
}
