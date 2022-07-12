import { UserModel } from "../models"

export interface UserRepository {
    create: (user: UserModel) => Promise<UserModel>;

    findUser: (email: string, password: string) => Promise<UserModel | null>;

    findUserByEmail: (email: string) => Promise<UserModel | null>
}