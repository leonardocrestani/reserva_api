import { User } from "../../core/entities";
import { CreateUser } from "../../core/use-cases";
import { UserRepository } from "../repository";

export class CreateUserService implements CreateUser {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(name: string, surname: string, cpf: string, country: string, email: string, password: string,
        phone_number: string): Promise<User> {
        return this.userRepository.create(name, surname, cpf, country, email, password,
            phone_number);
    }
}