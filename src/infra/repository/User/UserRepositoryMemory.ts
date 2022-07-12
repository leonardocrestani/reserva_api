import { UserRepository } from "../../../application/repository";
import { UserModel } from "../../../application/models/UserModel";

export class UserRepositoryMemory implements UserRepository {

    createdUsers: Array<UserModel> = []

    async create(data: any): Promise<UserModel> {
        this.createdUsers.push({ first_name: data.first_name, last_name: data.last_name, cpf: data.cpf,
            genre: data.genre, country: data.country, email: data.email, password: data.password, phone_number: data.phone_number });
        const createdUser = this.createdUsers[0]
        return createdUser;
    };

    async findUser(email: string, password: string): Promise<any> {
        const user = this.createdUsers.find(user => user.email === email && user.password === password);
        return user;
    }
    
    async findUserByEmail(email: string): Promise<any> {
        const user = this.createdUsers.find(user => user.email === email);
        return user;
    }

}