import { User } from "../../core/entities";
import { CreateUser } from "../../core/use-cases";
import { UserRepository } from "../repository";

export class CreateUserService implements CreateUser {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(first_name: string, last_name: string, cpf: string, country: string, email: string, password: string,
        phone_number: string): Promise<User> {
        const user = await this.userRepository.create(first_name, last_name, cpf, country, email, password, phone_number);
        if (!user) {
            throw new Error("Nao foi possivel cadastrar novo usuario");
        }
        return user;
    }
}