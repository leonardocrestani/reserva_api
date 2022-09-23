import { FindUser } from '../../../core/use-cases'
import { UserRepository } from '../../repository'
import { NotFound } from '../../errors/NotFound'
import { OutputFindUserDTO } from '../../dtos'

export class FindUserService implements FindUser {
  constructor (private readonly userRepository: UserRepository) { }

  async findByEmail (email: string): Promise<OutputFindUserDTO> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new NotFound('Usuario nao encontrado')
    }
    return user
  }
}
