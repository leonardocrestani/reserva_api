import cpfValidator from '../../../common/utils/cpfValidator'
import encryptPassword from '../../../common/utils/encryptPassword'
import { UpdateUser } from '../../../core/use-cases'
import { Conflict, UnprocessableEntity } from '../../errors'
import { UserModel } from '../../models'
import { UserRepository } from '../../repository'

export class UpdateUserService implements UpdateUser {
  constructor (private readonly userRepository: UserRepository) { };

  async update (email: string, data: any): Promise<void> {
    if (data.email) {
      if (await this.userRepository.findByEmail(data.email)) {
        throw new Conflict('Email ja cadastrado')
      }
    }
    if (data.password) {
      const encryptedPassword = await encryptPassword(data.password)
      data.password = encryptedPassword
    }
    if (data.cpf) {
      if (!cpfValidator(data.cpf)) {
        throw new UnprocessableEntity('CPF invalido')
      }
    }
    const operation = await this.userRepository.update(email, data)
    if (!operation) {
      throw new UnprocessableEntity('Erro ao atualizar usuario')
    }
  }
}
