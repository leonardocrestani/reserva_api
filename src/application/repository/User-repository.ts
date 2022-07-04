import { UserModel } from "../models/UserModel"

export default interface UserRepository {
    create: (name: string, surname: string, cpf: string, country: string, email: string, password: string,
        phone_number: string) => Promise<UserModel>;
}