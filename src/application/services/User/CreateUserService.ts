import { UserModel } from '../../models';
import { CreateUser } from "../../../core/use-cases";
import { UserRepository } from "../../repository";
import cpfValidator from "../../../common/utils/cpfValidator";
import generateToken from "../../../common/utils/generateToken";

export class CreateUserService implements CreateUser {
    constructor(private readonly userRepository: UserRepository) { }

    async create(data: UserModel): Promise<any> {
        if (!cpfValidator(data.cpf)) {
            throw new Error("CPF invalido");
        }
        if (await this.userRepository.findUserByEmail(data.email)) {
            throw new Error("Usuario ja cadastrado");
        }
        const user = await this.userRepository.create(data);
        if (!user) {
            throw new Error("Nao foi possivel cadastrar novo usuario");
        }
        const token = await generateToken(user);
        return { user, token };
    }
}