import { UserModel } from '../../models';
import { CreateUser } from "../../../core/use-cases";
import { UserRepository } from "../../repository";
import { UnprocessableEntity, Conflict, BadRequest } from '../../errors';
import cpfValidator from "../../../common/utils/cpfValidator";
import generateToken from "../../../common/utils/generateToken";

export class CreateUserService implements CreateUser {
    constructor(private readonly userRepository: UserRepository) { }

    async create(data: UserModel): Promise<any> {
        if (!cpfValidator(data.cpf)) {
            throw new UnprocessableEntity("CPF invalido");
        }
        if (await this.userRepository.findUserByEmail(data.email)) {
            throw new Conflict("Usuario ja cadastrado");
        }
        const user = await this.userRepository.create(data);
        if (!user) {
            throw new BadRequest("Nao foi possivel cadastrar novo usuario");
        }
        const token = await generateToken(user);
        return { user, token };
    }
}