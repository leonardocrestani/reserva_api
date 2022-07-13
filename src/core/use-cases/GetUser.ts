import { User } from '../entities';

export interface GetUser {
    execute: (email: string, password: string) => Promise<User>
}