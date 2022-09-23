import { CreateUser } from '../../../core/use-cases'
import { UserRepository } from '../../repository'
import { UnprocessableEntity, Conflict, BadRequest } from '../../errors'
import { UserModel } from '../../models'
import cpfValidator from '../../../common/utils/cpfValidator'
import generateToken from '../../../common/utils/generateToken'
import encryptPassword from '../../../common/utils/encryptPassword'
import { InputCreateUserDto, OutputCreateUserDTO } from '../../dtos'

export class CreateUserService implements CreateUser {
  constructor (private readonly userRepository: UserRepository) { }

  async create (data: InputCreateUserDto): Promise<OutputCreateUserDTO> {
    if (!cpfValidator(data.cpf)) {
      throw new UnprocessableEntity('CPF invalido')
    }
    if (await this.userRepository.findByEmail(data.email)) {
      throw new Conflict('Usuario ja cadastrado')
    }
    const encryptedPassword = await encryptPassword(data.password)
    data.password = encryptedPassword
    const newUser = new UserModel(data.first_name, data.last_name, data.cpf, data.genre, data.country, data.email, data.password, data.phone_number)
    const user = await this.userRepository.create(newUser)
    if (!user) {
      throw new BadRequest('Nao foi possivel cadastrar novo usuario')
    }
    const token = await generateToken(user)
    return { user, access_token: token }
  }
}
