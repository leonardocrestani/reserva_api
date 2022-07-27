import { UserModel } from "../models"

export interface UserRepository {
    create: (user: UserModel) => Promise<UserModel>;

    findOne: (email: string) => Promise<UserModel>

    remove: (email: string) => Promise<UserModel>;
}