import UserRepository from "../application/repository/User-repository";
import { UserModel } from "../application/models/UserModel";

export default class UserRepositoryMemory implements UserRepository {

    createdUsers: Array<UserModel> = []

    async create(user: UserModel): Promise<UserModel> {
        this.createdUsers.push(user);
        const createdUser = this.createdUsers[0]
        return createdUser;
    };

}