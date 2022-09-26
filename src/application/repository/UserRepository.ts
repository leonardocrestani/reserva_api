import { UserModel } from '../models'

export interface UserRepository {
    create: (user: UserModel) => Promise<UserModel>;

    findByEmail: (email: string) => Promise<UserModel>;

    findById: (id: string) => Promise<UserModel>;

    update: (email: string, data: object) => Promise<number>;

    remove: (email: string) => Promise<UserModel>;
}
