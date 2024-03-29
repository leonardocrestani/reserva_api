import generateToken from '../../../common/utils/generateToken'
import passwordValidator from '../../../common/utils/passwordValidator'
import { AuthenticateUser } from '../../../core/use-cases'
import { UserRepository } from '../../repository'
import { Unauhtorized } from '../../errors/Unauthorized'
import { OutputAuthUserDTO } from '../../dtos'

export class AuthenticateUserService implements AuthenticateUser {
  constructor (private readonly userRepository: UserRepository) { };

  async authenticate (email: string, password: string): Promise<OutputAuthUserDTO> {
    const user = await this.userRepository.findByEmail(email)
    if (user && await passwordValidator(user, password)) {
      const token = await generateToken(user)
      return { user: user.email, access_token: token }
    } else {
      throw new Unauhtorized('Email ou senha incorretos')
    }
  }
}
