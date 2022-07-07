import { User } from '../entities'

export interface CreateUser {
    execute: (first_name: string, last_name: string, cpf: string, country: string, email: string, password: string,
        phone_number: string) => Promise<User>
}