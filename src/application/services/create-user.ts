import User from "../../core/entities/User";
import CreateUser from "../../core/use-cases/create-user";
import UserRepository from "../repository/User-repository";

export class CreateUserService implements CreateUser {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(user: User): Promise<User> {
        return this.userRepository.create(user)
    }
}