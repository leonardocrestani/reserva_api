import { UserModel } from "../models/UserModel"

export interface UserRepository {
    create: (first_name: string, last_name: string, cpf: string, country: string, email: string, password: string,
        phone_number: string) => Promise<UserModel>;

    findUser: (email: string, password: string) => Promise<any>;

    findUserByEmail: (email: string) => Promise<any>
}