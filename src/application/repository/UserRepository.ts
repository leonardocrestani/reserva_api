import { UserModel } from "../models/UserModel"

export interface UserRepository {
    create: (name: string, surname: string, cpf: string, country: string, email: string, password: string,
        phone_number: string) => Promise<UserModel>;

    findUser: (email: string, password: string) => Promise<any>;
}