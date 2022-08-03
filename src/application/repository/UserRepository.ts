import { UserModel } from "../models"

export interface UserRepository {
    create: (user: UserModel) => Promise<UserModel>;

    findByEmail: (email: string) => Promise<UserModel>;

    update: (email: string, data: any) => Promise<UserModel>;

    remove: (email: string) => Promise<UserModel>;
}