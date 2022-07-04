import { UserRepository } from "../../application/repository";
import { UserModel } from "../../application/models/UserModel";

export class UserRepositoryMemory implements UserRepository {

    createdUsers: Array<UserModel> = []

    async create(name: string, surname: string, cpf: string, country: string, email: string, password: string,
        phone_number: string): Promise<UserModel> {
        this.createdUsers.push({ name, surname, cpf, country, email, password, phone_number });
        const createdUser = this.createdUsers[0]
        return Promise.resolve(createdUser);
    };

}