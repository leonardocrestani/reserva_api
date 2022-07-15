import { UserRepository } from "../../../application/repository";
import { UserModel } from "../../../application/models/UserModel";

export class UserRepositoryMemory implements UserRepository {

    createdUsers: Array<UserModel> = []

    async create(data: any): Promise<UserModel> {
        this.createdUsers.push(data);
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