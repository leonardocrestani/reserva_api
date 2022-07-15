import { UserModel } from "../models"

export interface UserRepository {
    create: (user: UserModel) => Promise<any>;

    findUser: (email: string, password: string) => Promise<any | null>;

    findUserByEmail: (email: string) => Promise<any | null>
}