import { User } from '../entities/User';

export interface GetUser {
    execute: (email: string, password: string) => Promise<object>
}