import { UserModel } from "../models"

export interface UserRepository {
    create: (user: UserModel) => Promise<UserModel>;

    findUser: (email: string, password: string) => Promise<UserModel>;

    findUserByEmail: (email: string) => Promise<UserModel>

    remove: (email: string) => Promise<UserModel>;
}