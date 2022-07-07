import { UserRepository } from "../../../application/repository";
import { UserModel } from "../../../application/models/UserModel";

export class UserRepositoryMemory implements UserRepository {

    createdUsers: Array<UserModel> = []

    async create(first_name: string, last_name: string, cpf: string, country: string, email: string, password: string,
        phone_number: string): Promise<UserModel> {
        this.createdUsers.push({ first_name, last_name, cpf, country, email, password, phone_number });
        const createdUser = this.createdUsers[0]
        return createdUser;
    };

    async findUser(email: string, password: string): Promise<any> {
        const user = this.createdUsers.find(user => user.email === email && user.password === password);
        return user;
    }

}