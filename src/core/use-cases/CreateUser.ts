import User from '../entities/User'

export default interface CreateUser {
    execute: (name: string, surname: string, cpf: string, country: string, email: string, password: string,
        phone_number: string) => Promise<User>
}