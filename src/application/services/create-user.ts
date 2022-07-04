import User from "../../core/entities/User";
import CreateUser from "../../core/use-cases/create-user";
import UserRepository from "../repository/User-repository";

export default class CreateUserService implements CreateUser {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(name: string, surname: string, cpf: string, country: string, email: string, password: string,
        phone_number: string): Promise<User> {
        return this.userRepository.create(name, surname, cpf, country, email, password,
            phone_number);
    }
}